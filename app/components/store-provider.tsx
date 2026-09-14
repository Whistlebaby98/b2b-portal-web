"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  addCartItem,
  calculateCartTotals,
  createCartItem,
  createOrderFromCart,
  getDefaultSku,
  getSkuById,
  getTierUnitPrice,
  removeCartItem,
  setAllCartItemsSelected,
  setCartItemQuantity,
  setCartItemSelected,
  type Address,
  type Cart,
  type CartTotals,
  type CompanyProfile,
  type InvoiceProfile,
  type Order,
  type PaymentMethod,
  type Product,
  type ProductCategory,
  type Promotion,
  type UserProfile,
} from "../lib/domain";
import { categories, companyProfile, currentUser, invoiceProfiles, mockAddresses, mockCart, mockOrders, products, promotions } from "../lib/mock-data";
import { readStorage, STORAGE_KEYS, writeStorage } from "../lib/storage";

/**
 * Client-side orchestration seam for the first vertical slice.
 *
 * The provider owns the temporary mock session, cart and locally-created
 * orders so pages stay focused on rendering. Replacing these callbacks with
 * API adapters should not require changing the page-level business flow.
 * New orders intentionally start as `pending_approval` per ADR 0001; this
 * buyer-facing MVP never performs approval actions itself.
 */
export type SessionState = { authenticated: boolean; email: string; user: UserProfile; company: CompanyProfile };

type StoreContextValue = {
  products: Product[];
  categories: ProductCategory[];
  promotions: Promotion[];
  addresses: Address[];
  invoices: InvoiceProfile[];
  company: CompanyProfile;
  user: UserProfile;
  session: SessionState;
  cart: Cart;
  orders: Order[];
  cartTotals: CartTotals;
  cartItemCount: number;
  addToCart: (productId: string, skuId?: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  toggleCartItem: (itemId: string, selected: boolean) => void;
  toggleAllCartItems: (selected: boolean) => void;
  removeFromCart: (itemId: string) => void;
  createOrder: (input: { addressId: string; invoiceId?: string; paymentMethod: PaymentMethod; note: string; requestedDeliveryDate?: string }) => Order | null;
  getOrder: (id: string) => Order | undefined;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  notify: (message: string, tone?: "neutral" | "success" | "warning" | "error") => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

// Catalogue-level agreement pricing is already represented by sku.price.
// Only item/cart campaigns are passed to the calculator, preventing the
// agreement campaign from being applied a second time as a discount.
const pricingPromotions = promotions.filter((promotion) => promotion.scope !== "catalogue");

function recalculate(cart: Cart, nextItems = cart.items): Cart {
  return { ...cart, items: nextItems, totals: calculateCartTotals(nextItems, { includeUnselected: true, promotions: pricingPromotions }).totals, updatedAt: new Date().toISOString() };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(mockCart);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [session, setSession] = useState<SessionState>({ authenticated: true, email: "procurement@lantu-mfg.example", user: currentUser, company: companyProfile });
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<{ message: string; tone: "neutral" | "success" | "warning" | "error" } | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const storedCart = readStorage<Cart | null>(STORAGE_KEYS.cart, null);
    const storedOrders = readStorage<Order[] | null>(STORAGE_KEYS.orders, null);
    const storedSession = readStorage<SessionState | null>(STORAGE_KEYS.session, null);
    if (storedCart) setCart(recalculate(storedCart));
    if (storedOrders) setOrders(storedOrders);
    if (storedSession) setSession(storedSession);
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) writeStorage(STORAGE_KEYS.cart, cart); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) writeStorage(STORAGE_KEYS.orders, orders); }, [orders, hydrated]);
  useEffect(() => { if (hydrated) writeStorage(STORAGE_KEYS.session, session); }, [session, hydrated]);

  const notify = useCallback((message: string, tone: "neutral" | "success" | "warning" | "error" = "neutral") => {
    setToast({ message, tone });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const event = new CustomEvent("nova-toast", { detail: toast });
    window.dispatchEvent(event);
  }, [toast]);

  const addToCart = useCallback((productId: string, skuId?: string, quantity = 1) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    const sku = skuId ? getSkuById(product, skuId) ?? getDefaultSku(product) : getDefaultSku(product);
    const nextItem = createCartItem(product, sku, quantity);
    setCart((current) => {
      const next = addCartItem(current, nextItem);
      const nextItems = next.items.map((item) => item.skuId === sku.id ? { ...item, unitPrice: getTierUnitPrice(sku, item.quantity) } : item);
      return recalculate(next, nextItems);
    });
    notify(`已将 ${product.title} 加入采购车`, "success");
  }, [notify]);

  const updateCartQuantity = useCallback((itemId: string, quantity: number) => {
    const current = cart.items.find((item) => item.id === itemId);
    if (!current) return;
    const product = products.find((item) => item.id === current.productId);
    const sku = product ? getSkuById(product, current.skuId) : undefined;
    const next = setCartItemQuantity(cart, itemId, quantity);
    const nextItems = next.items.map((item) => item.id === itemId && sku ? { ...item, unitPrice: getTierUnitPrice(sku, item.quantity) } : item);
    setCart(recalculate(next, nextItems));
  }, [cart]);

  const toggleCartItem = useCallback((itemId: string, selected: boolean) => setCart((current) => recalculate(current, setCartItemSelected(current, itemId, selected).items)), []);
  const toggleAllCartItems = useCallback((selected: boolean) => setCart((current) => recalculate(current, setAllCartItemsSelected(current, selected).items)), []);
  const removeFromCart = useCallback((itemId: string) => setCart((current) => recalculate(current, removeCartItem(current, itemId).items)), []);

  const createOrder = useCallback((input: { addressId: string; invoiceId?: string; paymentMethod: PaymentMethod; note: string; requestedDeliveryDate?: string }) => {
    const address = mockAddresses.find((item) => item.id === input.addressId);
    const invoice = input.invoiceId ? invoiceProfiles.find((item) => item.id === input.invoiceId) : undefined;
    const selected = cart.items.filter((item) => item.selected);
    if (!address || address.kind !== "shipping") {
      notify("请选择有效的收货地址", "warning");
      return null;
    }
    if (!invoice) {
      notify("请选择有效的发票档案", "warning");
      return null;
    }
    if (selected.length === 0) {
      notify("请至少选择一件商品后再提交", "warning");
      return null;
    }
    const unavailable = selected.find((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      const sku = product ? getSkuById(product, item.skuId) : undefined;
      return !sku || sku.status !== "available" || item.quantity > sku.stock;
    });
    if (unavailable) {
      notify(`${unavailable.productTitle} 库存或可售状态已变化，请返回采购车调整`, "warning");
      return null;
    }
    // The service function snapshots the selected lines, address and invoice
    // before the selected cart lines are removed from the editable draft.
    const order = createOrderFromCart(cart, address, invoice, currentUser, input, products, pricingPromotions);
    setOrders((current) => [order, ...current]);
    setCart((current) => recalculate(current, current.items.filter((item) => !item.selected)));
    notify(`订单 ${order.orderNo} 已提交，等待审批`, "success");
    return order;
  }, [cart, notify]);

  const login = useCallback(async (email: string) => {
    setSession({ authenticated: true, email, user: currentUser, company: companyProfile });
  }, []);
  const register = useCallback(async (_name: string, email: string) => {
    setSession({ authenticated: true, email, user: currentUser, company: companyProfile });
  }, []);
  const logout = useCallback(() => setSession((current) => ({ ...current, authenticated: false })), []);

  const cartTotals = useMemo(() => calculateCartTotals(cart.items, { promotions: pricingPromotions }).totals, [cart.items]);
  const value = useMemo<StoreContextValue>(() => ({
    products, categories, promotions, addresses: mockAddresses, invoices: invoiceProfiles,
    company: session.company, user: session.user, session, cart, orders, cartTotals,
    cartItemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    addToCart, updateCartQuantity, toggleCartItem, toggleAllCartItems, removeFromCart, createOrder,
    getOrder: (id) => orders.find((order) => order.id === id || order.orderNo === id), login, register, logout, notify,
  }), [cart, orders, session, cartTotals, addToCart, updateCartQuantity, toggleCartItem, toggleAllCartItems, removeFromCart, createOrder, login, register, logout, notify]);

  return <StoreContext.Provider value={value}>{children}{toast && <ToastMessage message={toast.message} tone={toast.tone} />}</StoreContext.Provider>;
}

function ToastMessage({ message, tone }: { message: string; tone: string }) {
  const toneClass = tone === "success" ? "bg-[#148b85]" : tone === "warning" ? "bg-[#a46d1b]" : tone === "error" ? "bg-[#b8594c]" : "bg-ink";
  return <div role="status" className={`fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-2xl ${toneClass} px-4 py-3 text-[12px] font-semibold text-white shadow-[0_14px_40px_rgba(16,35,63,0.22)]`}><span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20"><span className="text-[11px]">✓</span></span>{message}</div>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
