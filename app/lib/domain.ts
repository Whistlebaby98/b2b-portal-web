/**
 * Shared domain vocabulary for the NOVA B2B storefront.
 *
 * The UI is intentionally backed by plain, serialisable objects.  This keeps
 * the first version easy to hydrate from localStorage and makes the contracts
 * usable by a future API adapter without changing component state shapes.
 */

export type Currency = "CNY";
export type PaymentMethod = "credit_account" | "bank_transfer" | "online";

export type ProductId = string;
export type SkuId = string;
export type PromotionId = string;
export type AddressId = string;
export type InvoiceId = string;
export type CartItemId = string;
export type OrderId = string;

export type ProductStatus = "active" | "inactive" | "draft";
export type SkuStatus = "available" | "out_of_stock" | "discontinued";
export type Availability = "in_stock" | "low_stock" | "preorder" | "out_of_stock";

export type ProductCategoryId =
  | "precision-parts"
  | "industrial-automation"
  | "electrical-components"
  | "tools-and-consumables"
  | "office-and-safety";

export interface ProductCategory {
  id: ProductCategoryId;
  name: string;
  description?: string;
  productCount?: number;
}

export interface PriceTier {
  /** Inclusive minimum quantity for this tier. */
  minQuantity: number;
  unitPrice: number;
  label?: string;
}

export interface ProductSku {
  id: SkuId;
  productId: ProductId;
  code: string;
  name: string;
  attributes: Record<string, string>;
  unit: string;
  /** Current enterprise/customer price before a cart promotion. */
  price: number;
  /** Public/list price used to show the saving in the catalogue. */
  listPrice?: number;
  currency: Currency;
  priceTiers: PriceTier[];
  stock: number;
  availability: Availability;
  leadTimeLabel: string;
  status: SkuStatus;
  weightKg?: number;
  barcode?: string;
}

export interface Product {
  id: ProductId;
  slug: string;
  /** `title` is the display name used throughout the storefront. */
  title: string;
  subtitle: string;
  brand: string;
  categoryId: ProductCategoryId;
  category: string;
  description: string;
  unit: string;
  skus: ProductSku[];
  defaultSkuId: SkuId;
  thumbnail?: string;
  /** Small visual tokens allow the mock catalogue to work without image assets. */
  tone: string;
  accent: string;
  mark: string;
  badges: ProductBadge[];
  tags: string[];
  status: ProductStatus;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProductBadge = "agreement" | "bestseller" | "new" | "spot" | "promotion";

export interface PromotionTier {
  minQuantity?: number;
  minSubtotal?: number;
  discountRate?: number;
  discountAmount?: number;
  unitPrice?: number;
}

export type PromotionType =
  | "percentage"
  | "fixed_amount"
  | "tier_price"
  | "coupon"
  | "free_shipping";

export type PromotionScope = "catalogue" | "product" | "sku" | "category" | "cart";

export interface Promotion {
  id: PromotionId;
  code?: string;
  title: string;
  description: string;
  type: PromotionType;
  scope: PromotionScope;
  productIds?: ProductId[];
  skuIds?: SkuId[];
  categoryIds?: ProductCategoryId[];
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  /** 0.1 means 10%; kept as a fraction for calculation clarity. */
  discountRate?: number;
  discountAmount?: number;
  minSubtotal?: number;
  minQuantity?: number;
  maxDiscount?: number;
  tiers?: PromotionTier[];
  stackable?: boolean;
  priority?: number;
}

export type CustomerTier = "standard" | "silver" | "gold" | "strategic";

export interface CompanyProfile {
  id: string;
  name: string;
  shortName: string;
  taxId: string;
  customerTier: CustomerTier;
  isVerified: boolean;
  creditLimit: number;
  creditUsed: number;
  paymentTermDays: number;
  currency: Currency;
}

export interface UserProfile {
  id: string;
  name: string;
  role: "owner" | "buyer" | "approver" | "finance" | "viewer";
  department: string;
  avatarText: string;
  companyId: string;
}

export type AddressKind = "shipping" | "billing";

export interface Address {
  id: AddressId;
  label: string;
  kind: AddressKind;
  recipient: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  postalCode?: string;
  isDefault: boolean;
}

export type InvoiceType = "vat_special" | "vat_normal" | "electronic";
export type InvoiceStatus = "active" | "pending_verification" | "disabled";

export interface InvoiceProfile {
  id: InvoiceId;
  type: InvoiceType;
  title: string;
  taxId: string;
  bankName?: string;
  bankAccount?: string;
  registeredAddress?: string;
  registeredPhone?: string;
  receiveEmail: string;
  status: InvoiceStatus;
  isDefault: boolean;
}

/** A frozen copy of an address/invoice attached to an order. */
export type AddressSnapshot = Omit<Address, "isDefault">;
export type InvoiceSnapshot = Omit<InvoiceProfile, "isDefault" | "status">;

export interface CartItem {
  id: CartItemId;
  productId: ProductId;
  categoryId?: ProductCategoryId;
  skuId: SkuId;
  skuCode: string;
  productTitle: string;
  skuName: string;
  unit: string;
  unitPrice: number;
  listUnitPrice?: number;
  quantity: number;
  selected: boolean;
  /** IDs of promotions applied when the item was priced. */
  promotionIds: PromotionId[];
  addedAt: string;
}

export interface CartTotals {
  currency: Currency;
  itemCount: number;
  subtotal: number;
  listSubtotal: number;
  promotionDiscount: number;
  shippingFee: number;
  tax: number;
  total: number;
}

export interface Cart {
  id: string;
  companyId: string;
  currency: Currency;
  items: CartItem[];
  couponCode?: string;
  totals: CartTotals;
  updatedAt: string;
}

export type OrderStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "awaiting_payment"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled"
  | "rejected";

export type ApprovalStatus = "not_required" | "pending" | "approved" | "rejected";

export interface OrderLine {
  id: string;
  productId: ProductId;
  skuId: SkuId;
  skuCode: string;
  productTitle: string;
  skuName: string;
  attributes: Record<string, string>;
  unit: string;
  quantity: number;
  unitPrice: number;
  listUnitPrice?: number;
  promotionDiscount: number;
  subtotal: number;
}

export interface OrderTotals {
  currency: Currency;
  subtotal: number;
  listSubtotal: number;
  promotionDiscount: number;
  shippingFee: number;
  tax: number;
  total: number;
}

export interface Order {
  id: OrderId;
  orderNo: string;
  companyId: string;
  createdBy: string;
  status: OrderStatus;
  approvalStatus: ApprovalStatus;
  paymentMethod: PaymentMethod;
  lines: OrderLine[];
  totals: OrderTotals;
  shippingAddress: AddressSnapshot;
  invoice?: InvoiceSnapshot;
  note?: string;
  requestedDeliveryDate?: string;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  paidAt?: string;
  shippedAt?: string;
  completedAt?: string;
}

export interface CatalogFilters {
  query: string;
  categoryId?: ProductCategoryId;
  brand?: string;
  availability?: Availability;
  badge?: ProductBadge;
  minPrice?: number;
  maxPrice?: number;
  sortBy: "recommended" | "price_asc" | "price_desc" | "newest";
  page: number;
  pageSize: number;
}

export interface CheckoutState {
  addressId?: AddressId;
  invoiceId?: InvoiceId;
  paymentMethod: PaymentMethod;
  note: string;
  requestedDeliveryDate?: string;
  isSubmitting: boolean;
  error?: string;
}

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
  status: AsyncStatus;
  data?: T;
  error?: string;
}

export type ToastTone = "neutral" | "success" | "warning" | "error";

export interface ToastMessage {
  id: string;
  message: string;
  tone: ToastTone;
  durationMs?: number;
}

export interface BulkSkuRow {
  skuCode: string;
  quantity: number;
  raw: string;
  lineNumber: number;
  error?: string;
}

export interface CartCalculationOptions {
  promotions?: Promotion[];
  shippingFee?: number;
  taxRate?: number;
  includeUnselected?: boolean;
}

export interface CartCalculationResult {
  totals: CartTotals;
  items: CartItem[];
}

export const EMPTY_CART_TOTALS: CartTotals = {
  currency: "CNY",
  itemCount: 0,
  subtotal: 0,
  listSubtotal: 0,
  promotionDiscount: 0,
  shippingFee: 0,
  tax: 0,
  total: 0,
};

export function getDefaultSku(product: Product): ProductSku {
  return product.skus.find((sku) => sku.id === product.defaultSkuId) ?? product.skus[0];
}

export function getSkuById(product: Product, skuId: SkuId): ProductSku | undefined {
  return product.skus.find((sku) => sku.id === skuId);
}

export function getTierUnitPrice(sku: ProductSku, quantity: number): number {
  const safeQuantity = Math.max(0, Math.floor(quantity));
  const tiers = [...sku.priceTiers].sort((a, b) => a.minQuantity - b.minQuantity);
  const matchingTier = tiers.filter((tier) => safeQuantity >= tier.minQuantity).at(-1);
  return matchingTier?.unitPrice ?? sku.price;
}

export function isPromotionActive(promotion: Promotion, now = new Date()): boolean {
  if (!promotion.isActive) return false;
  const startsAt = Date.parse(promotion.startsAt);
  const endsAt = Date.parse(promotion.endsAt);
  const timestamp = now.getTime();
  return (!Number.isFinite(startsAt) || timestamp >= startsAt) && (!Number.isFinite(endsAt) || timestamp <= endsAt);
}

function promotionAppliesToItem(promotion: Promotion, item: CartItem): boolean {
  if (!isPromotionActive(promotion)) return false;
  // Catalogue-level agreement pricing is already represented by item.unitPrice.
  // Cart-level rules are calculated once at cart scope, never once per line.
  if (promotion.scope === "cart" || promotion.scope === "catalogue") return false;
  if (promotion.skuIds?.includes(item.skuId)) return true;
  if (promotion.productIds?.includes(item.productId)) return true;
  if (item.categoryId && promotion.categoryIds?.includes(item.categoryId)) return true;
  return false;
}

export function calculateItemPromotionDiscount(
  item: CartItem,
  promotions: Promotion[] = [],
): number {
  const baseSubtotal = item.unitPrice * item.quantity;
  const applicable = promotions
    .filter((promotion) => promotionAppliesToItem(promotion, item))
    .filter((promotion) => !promotion.minQuantity || item.quantity >= promotion.minQuantity)
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

  let discount = 0;
  // One activity rule is applied per line in the MVP. Agreement price remains
  // the base price, so catalogue-wide agreement campaigns are informational.
  const promotion = applicable[0];
  if (promotion) {
    if (promotion.type === "percentage" || promotion.type === "coupon") {
      discount += baseSubtotal * (promotion.discountRate ?? 0);
    } else if (promotion.type === "fixed_amount") {
      discount += promotion.discountAmount ?? 0;
    } else if (promotion.type === "tier_price") {
      const tiers = (promotion.tiers ?? []).filter(
        (tier) => !tier.minQuantity || item.quantity >= tier.minQuantity,
      );
      const tier = [...tiers].sort((a, b) => (a.minQuantity ?? 0) - (b.minQuantity ?? 0)).at(-1);
      if (tier?.unitPrice !== undefined) {
        discount += Math.max(0, item.unitPrice - tier.unitPrice) * item.quantity;
      } else if (tier?.discountRate !== undefined) {
        discount += baseSubtotal * tier.discountRate;
      } else if (tier?.discountAmount !== undefined) {
        discount += tier.discountAmount;
      }
    }
  }

  const maxDiscount = promotion?.maxDiscount;
  if (maxDiscount !== undefined) discount = Math.min(discount, maxDiscount);
  return roundMoney(Math.max(0, Math.min(discount, baseSubtotal)));
}

export function calculateCartTotals(
  items: CartItem[],
  options: CartCalculationOptions = {},
): CartCalculationResult {
  const selectedItems = options.includeUnselected
    ? items
    : items.filter((item) => item.selected);
  const promotions = options.promotions ?? [];
  const subtotal = selectedItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const listSubtotal = selectedItems.reduce(
    (sum, item) => sum + (item.listUnitPrice ?? item.unitPrice) * item.quantity,
    0,
  );
  const itemPromotionDiscount = selectedItems.reduce(
    (sum, item) => sum + calculateItemPromotionDiscount(item, promotions),
    0,
  );
  const cartPromotion = promotions
    .filter((promotion) => isPromotionActive(promotion) && promotion.scope === "cart")
    .filter((promotion) => promotion.minSubtotal === undefined || subtotal >= promotion.minSubtotal)
    .filter((promotion) => promotion.type === "percentage" || promotion.type === "fixed_amount" || promotion.type === "coupon")
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0];
  const cartDiscount = cartPromotion
    ? cartPromotion.type === "percentage"
      ? subtotal * (cartPromotion.discountRate ?? 0)
      : cartPromotion.discountAmount ?? 0
    : 0;
  const promotionDiscount = Math.min(subtotal, roundMoney(itemPromotionDiscount + cartDiscount));
  const shippingFee = Math.max(0, options.shippingFee ?? 0);
  const taxable = Math.max(0, subtotal - promotionDiscount + shippingFee);
  const tax = roundMoney(taxable * Math.max(0, options.taxRate ?? 0));
  const total = roundMoney(taxable + tax);
  const totals: CartTotals = {
    currency: "CNY",
    itemCount: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: roundMoney(subtotal),
    listSubtotal: roundMoney(listSubtotal),
    promotionDiscount: roundMoney(promotionDiscount),
    shippingFee: roundMoney(shippingFee),
    tax,
    total,
  };
  return { totals, items };
}

export function createCartItem(
  product: Product,
  sku: ProductSku = getDefaultSku(product),
  quantity = 1,
  now = new Date().toISOString(),
): CartItem {
  const safeQuantity = Math.max(1, Math.floor(quantity));
  return {
    id: `${product.id}:${sku.id}`,
    productId: product.id,
    categoryId: product.categoryId,
    skuId: sku.id,
    skuCode: sku.code,
    productTitle: product.title,
    skuName: sku.name,
    unit: sku.unit || product.unit,
    unitPrice: getTierUnitPrice(sku, safeQuantity),
    listUnitPrice: sku.listPrice,
    quantity: safeQuantity,
    selected: true,
    promotionIds: [],
    addedAt: now,
  };
}

export function addCartItem(cart: Cart, nextItem: CartItem): Cart {
  const existing = cart.items.find((item) => item.skuId === nextItem.skuId);
  const items = existing
    ? cart.items.map((item) =>
        item.skuId === nextItem.skuId
          ? {
              ...item,
              categoryId: nextItem.categoryId ?? item.categoryId,
              quantity: item.quantity + nextItem.quantity,
              unitPrice: nextItem.unitPrice,
              listUnitPrice: nextItem.listUnitPrice,
              selected: true,
            }
          : item,
      )
    : [...cart.items, nextItem];
  return { ...cart, items, updatedAt: new Date().toISOString() };
}

export function setCartItemQuantity(cart: Cart, itemId: CartItemId, quantity: number): Cart {
  const safeQuantity = Math.max(0, Math.floor(quantity));
  const items = safeQuantity === 0
    ? cart.items.filter((item) => item.id !== itemId)
    : cart.items.map((item) => (item.id === itemId ? { ...item, quantity: safeQuantity } : item));
  return { ...cart, items, updatedAt: new Date().toISOString() };
}

export function setCartItemSelected(cart: Cart, itemId: CartItemId, selected: boolean): Cart {
  return {
    ...cart,
    items: cart.items.map((item) => (item.id === itemId ? { ...item, selected } : item)),
    updatedAt: new Date().toISOString(),
  };
}

export function setAllCartItemsSelected(cart: Cart, selected: boolean): Cart {
  return {
    ...cart,
    items: cart.items.map((item) => ({ ...item, selected })),
    updatedAt: new Date().toISOString(),
  };
}

export function removeCartItem(cart: Cart, itemId: CartItemId): Cart {
  return {
    ...cart,
    items: cart.items.filter((item) => item.id !== itemId),
    updatedAt: new Date().toISOString(),
  };
}

export function clearCart(cart: Cart): Cart {
  return { ...cart, items: [], totals: EMPTY_CART_TOTALS, updatedAt: new Date().toISOString() };
}

export function searchProducts(products: Product[], filters: Partial<CatalogFilters>): Product[] {
  const query = filters.query?.trim().toLowerCase() ?? "";
  const filtered = products.filter((product) => {
    if (product.status !== "active") return false;
    if (filters.categoryId && product.categoryId !== filters.categoryId) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.badge && !product.badges.includes(filters.badge)) return false;
    if (query) {
      const searchable = [
        product.title,
        product.subtitle,
        product.brand,
        product.category,
        ...product.tags,
        ...product.skus.flatMap((sku) => [sku.code, sku.name, ...Object.values(sku.attributes)]),
      ]
        .join(" ")
        .toLowerCase();
      if (!searchable.includes(query)) return false;
    }
    if (filters.availability && !product.skus.some((sku) => sku.availability === filters.availability)) {
      return false;
    }
    const defaultSku = getDefaultSku(product);
    if (filters.minPrice !== undefined && defaultSku.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && defaultSku.price > filters.maxPrice) return false;
    return true;
  });

  const sorted = [...filtered];
  switch (filters.sortBy) {
    case "price_asc":
      sorted.sort((a, b) => getDefaultSku(a).price - getDefaultSku(b).price);
      break;
    case "price_desc":
      sorted.sort((a, b) => getDefaultSku(b).price - getDefaultSku(a).price);
      break;
    case "newest":
      sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    default:
      sorted.sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)));
  }
  return sorted;
}

export function parseBulkSkuInput(input: string): BulkSkuRow[] {
  return input
    .split(/\r?\n/)
    .map((raw, index) => ({ raw: raw.trim(), lineNumber: index + 1 }))
    .filter(({ raw }) => raw.length > 0)
    .map(({ raw, lineNumber }) => {
      const columns = raw.split(/[\t,; ]+/).filter(Boolean);
      const skuCode = columns[0] ?? "";
      const quantity = Number(columns[1]);
      const error = !skuCode
        ? "缺少 SKU"
        : !Number.isFinite(quantity) || quantity <= 0
          ? "数量需为大于 0 的数字"
          : undefined;
      return {
        skuCode,
        quantity: error ? 0 : Math.floor(quantity),
        raw,
        lineNumber,
        error,
      };
    });
}

export function createOrderFromCart(
  cart: Cart,
  address: Address,
  invoice: InvoiceProfile | undefined,
  user: UserProfile,
  options: Pick<CheckoutState, "paymentMethod" | "note" | "requestedDeliveryDate">,
  products: Product[] = [],
  promotions: Promotion[] = [],
  now = new Date(),
): Order {
  const selected = cart.items.filter((item) => item.selected);
  const calculated = calculateCartTotals(selected, { promotions });
  const lines: OrderLine[] = selected.map((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    const sku = product ? getSkuById(product, item.skuId) : undefined;
    const promotionDiscount = calculateItemPromotionDiscount(item, promotions);
    return {
      id: `${cart.id}:${item.id}`,
      productId: item.productId,
      skuId: item.skuId,
      skuCode: item.skuCode,
      productTitle: item.productTitle,
      skuName: item.skuName,
      attributes: sku?.attributes ?? {},
      unit: item.unit,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      listUnitPrice: item.listUnitPrice,
      promotionDiscount,
      subtotal: roundMoney(item.unitPrice * item.quantity - promotionDiscount),
    };
  });
  const timestamp = now.toISOString();
  const orderId = `ord_${now.getTime()}`;
  const orderNo = `PO${formatOrderDate(now)}${String(now.getTime()).slice(-6)}`;
  return {
    id: orderId,
    orderNo,
    companyId: user.companyId,
    createdBy: user.id,
    status: "pending_approval",
    approvalStatus: "pending",
    paymentMethod: options.paymentMethod,
    lines,
    totals: {
      ...calculated.totals,
    },
    shippingAddress: toAddressSnapshot(address),
    invoice: invoice ? toInvoiceSnapshot(invoice) : undefined,
    note: options.note || undefined,
    requestedDeliveryDate: options.requestedDeliveryDate,
    createdAt: timestamp,
    updatedAt: timestamp,
    submittedAt: timestamp,
  };
}

export function toAddressSnapshot(address: Address): AddressSnapshot {
  const { isDefault: _isDefault, ...snapshot } = address;
  return snapshot;
}

export function toInvoiceSnapshot(invoice: InvoiceProfile): InvoiceSnapshot {
  const { isDefault: _isDefault, status: _status, ...snapshot } = invoice;
  return snapshot;
}

export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatMoney(value: number, currency: Currency = "CNY"): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatCompactMoney(value: number, currency: Currency = "CNY"): string {
  if (Math.abs(value) >= 10000) {
    const unit = Math.abs(value) >= 100000000 ? "亿" : "万";
    const divisor = unit === "亿" ? 100000000 : 10000;
    return `${currency === "CNY" ? "¥" : ""}${(value / divisor).toFixed(1)}${unit}`;
  }
  return formatMoney(value, currency);
}

export function formatQuantity(quantity: number, unit = "件"): string {
  return `${new Intl.NumberFormat("zh-CN").format(Math.max(0, quantity))} ${unit}`;
}

export function formatDate(value: string | Date, withYear = true): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("zh-CN", {
    year: withYear ? "numeric" : undefined,
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function formatDateTime(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  draft: "草稿",
  pending_approval: "待审批",
  approved: "已审批",
  awaiting_payment: "待付款",
  processing: "处理中",
  shipped: "已发货",
  completed: "已完成",
  cancelled: "已取消",
  rejected: "已驳回",
};

export const ORDER_STATUS_TONES: Record<OrderStatus, ToastTone> = {
  draft: "neutral",
  pending_approval: "warning",
  approved: "success",
  awaiting_payment: "warning",
  processing: "neutral",
  shipped: "success",
  completed: "success",
  cancelled: "error",
  rejected: "error",
};

export function getOrderStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABELS[status];
}

function formatOrderDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}
