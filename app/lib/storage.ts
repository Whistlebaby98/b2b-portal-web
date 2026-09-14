import type { Cart, CatalogFilters, CheckoutState, Order } from "./domain";
import { EMPTY_CART_TOTALS } from "./domain";

/**
 * Browser storage helpers that are safe to call from a Next.js server render.
 * Every operation is best-effort: private browsing, disabled storage and quota
 * errors should never prevent the storefront from rendering.
 */

export const STORAGE_NAMESPACE = "nova-b2b";

export const STORAGE_KEYS = {
  cart: `${STORAGE_NAMESPACE}:cart`,
  filters: `${STORAGE_NAMESPACE}:catalog-filters`,
  checkout: `${STORAGE_NAMESPACE}:checkout`,
  orders: `${STORAGE_NAMESPACE}:orders`,
  session: `${STORAGE_NAMESPACE}:session`,
  recentSearches: `${STORAGE_NAMESPACE}:recent-searches`,
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS] | string;
export type StorageValidator<T> = (value: unknown) => value is T;

export interface StorageOptions {
  storage?: Storage | null;
  namespace?: string;
}

function resolveStorage(storage?: Storage | null): Storage | undefined {
  if (storage !== undefined) return storage ?? undefined;
  if (typeof window === "undefined") return undefined;
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function resolveKey(key: string, namespace?: string): string {
  if (!namespace || key.startsWith(`${namespace}:`)) return key;
  return `${namespace}:${key}`;
}

export function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function readStorage<T>(
  key: StorageKey,
  fallback: T,
  validator?: StorageValidator<T>,
  options: StorageOptions = {},
): T {
  const target = resolveStorage(options.storage);
  if (!target) return fallback;
  try {
    const parsed = safeJsonParse<unknown>(target.getItem(resolveKey(key, options.namespace)), undefined);
    if (parsed === undefined) return fallback;
    if (validator && !validator(parsed)) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(
  key: StorageKey,
  value: T,
  options: StorageOptions = {},
): boolean {
  const target = resolveStorage(options.storage);
  if (!target) return false;
  try {
    target.setItem(resolveKey(key, options.namespace), JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorage(key: StorageKey, options: StorageOptions = {}): boolean {
  const target = resolveStorage(options.storage);
  if (!target) return false;
  try {
    target.removeItem(resolveKey(key, options.namespace));
    return true;
  } catch {
    return false;
  }
}

export function hasStorage(key: StorageKey, options: StorageOptions = {}): boolean {
  const target = resolveStorage(options.storage);
  if (!target) return false;
  try {
    return target.getItem(resolveKey(key, options.namespace)) !== null;
  } catch {
    return false;
  }
}

export function updateStorage<T>(
  key: StorageKey,
  fallback: T,
  updater: (current: T) => T,
  validator?: StorageValidator<T>,
  options: StorageOptions = {},
): T {
  const current = readStorage(key, fallback, validator, options);
  const next = updater(current);
  writeStorage(key, next, options);
  return next;
}

export function isCart(value: unknown): value is Cart {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Cart>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.companyId === "string" &&
    Array.isArray(candidate.items) &&
    typeof candidate.updatedAt === "string"
  );
}

export function isCatalogFilters(value: unknown): value is CatalogFilters {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<CatalogFilters>;
  return (
    typeof candidate.query === "string" &&
    typeof candidate.page === "number" &&
    typeof candidate.pageSize === "number" &&
    typeof candidate.sortBy === "string"
  );
}

export function isCheckoutState(value: unknown): value is CheckoutState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<CheckoutState>;
  return typeof candidate.paymentMethod === "string" && typeof candidate.note === "string";
}

export function isOrderList(value: unknown): value is Order[] {
  return Array.isArray(value) && value.every((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const candidate = entry as Partial<Order>;
    return typeof candidate.id === "string" && typeof candidate.orderNo === "string";
  });
}

export function loadCart(fallback: Cart, options: StorageOptions = {}): Cart {
  const stored = readStorage(STORAGE_KEYS.cart, fallback, isCart, options);
  // Old fixture versions may not have totals.  Keep the shape stable for the
  // cart drawer while preserving all user-entered items.
  return {
    ...stored,
    currency: stored.currency ?? "CNY",
    items: Array.isArray(stored.items) ? stored.items : [],
    totals: stored.totals ?? EMPTY_CART_TOTALS,
  };
}

export function saveCart(cart: Cart, options: StorageOptions = {}): boolean {
  return writeStorage(STORAGE_KEYS.cart, cart, options);
}

export function loadCatalogFilters(
  fallback: CatalogFilters,
  options: StorageOptions = {},
): CatalogFilters {
  return readStorage(STORAGE_KEYS.filters, fallback, isCatalogFilters, options);
}

export function saveCatalogFilters(
  filters: CatalogFilters,
  options: StorageOptions = {},
): boolean {
  return writeStorage(STORAGE_KEYS.filters, filters, options);
}

export function loadCheckoutState(
  fallback: CheckoutState,
  options: StorageOptions = {},
): CheckoutState {
  return readStorage(STORAGE_KEYS.checkout, fallback, isCheckoutState, options);
}

export function saveCheckoutState(
  state: CheckoutState,
  options: StorageOptions = {},
): boolean {
  return writeStorage(STORAGE_KEYS.checkout, state, options);
}

export function loadOrders(fallback: Order[], options: StorageOptions = {}): Order[] {
  return readStorage(STORAGE_KEYS.orders, fallback, isOrderList, options);
}

export function saveOrders(orders: Order[], options: StorageOptions = {}): boolean {
  return writeStorage(STORAGE_KEYS.orders, orders, options);
}

export function loadRecentSearches(
  fallback: string[] = [],
  options: StorageOptions = {},
): string[] {
  const searches = readStorage(STORAGE_KEYS.recentSearches, fallback, (value): value is string[] => (
    Array.isArray(value) && value.every((entry) => typeof entry === "string")
  ), options);
  return searches.filter(Boolean).slice(0, 10);
}

export function saveRecentSearches(
  searches: string[],
  options: StorageOptions = {},
): boolean {
  return writeStorage(STORAGE_KEYS.recentSearches, searches.filter(Boolean).slice(0, 10), options);
}

export function rememberSearch(
  query: string,
  fallback: string[] = [],
  options: StorageOptions = {},
): string[] {
  const normalized = query.trim();
  if (!normalized) return loadRecentSearches(fallback, options);
  const next = [normalized, ...loadRecentSearches(fallback, options).filter((item) => item !== normalized)].slice(0, 10);
  saveRecentSearches(next, options);
  return next;
}
