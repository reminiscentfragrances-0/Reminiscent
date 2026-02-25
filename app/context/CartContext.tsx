"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import Link from "next/link";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextValue = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "reminiscent-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(loadCart);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      const qty = Math.max(1, item.quantity ?? 1);
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === item.productId);
        let next: CartItem[];
        if (existing) {
          next = prev.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + qty }
              : i,
          );
        } else {
          next = [
            ...prev,
            {
              productId: item.productId,
              slug: item.slug,
              name: item.name,
              price: item.price,
              image: item.image,
              quantity: qty,
            },
          ];
        }
        saveCart(next);
        return next;
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.productId !== productId);
      saveCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const qty = Math.max(0, quantity);
    setItems((prev) => {
      if (qty === 0) {
        const next = prev.filter((i) => i.productId !== productId);
        saveCart(next);
        return next;
      }
      const next = prev.map((i) =>
        i.productId === productId ? { ...i, quantity: qty } : i,
      );
      saveCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    saveCart([]);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, closeCart]);

  const itemCount = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
        items,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Close cart"
        onClick={closeCart}
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:bg-black/40 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      {/* Sidebar (desktop) / Bottom sheet (mobile) */}
      <aside
        className={`fixed z-[101] transition-transform duration-300 ease-out
          bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl
          lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-[400px] lg:max-w-[calc(100vw-2rem)] lg:rounded-none
          glass-nav border border-white/10 border-b-0 lg:border-b lg:border-l lg:shadow-2xl
          ${isOpen ? "translate-y-0 lg:translate-x-0" : "translate-y-full lg:translate-y-0 lg:translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full max-h-[85vh] lg:max-h-none lg:h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
            <h2 className="text-white text-sm font-light tracking-widest uppercase">
              Your Cart
            </h2>
            <button
              type="button"
              onClick={closeCart}
              className="p-2 -m-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close cart"
            >
              <CloseOutlinedIcon sx={{ fontSize: 24 }} />
            </button>
          </div>

          {/* Items + total */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            <div className="flex flex-col gap-6">
              {items.length === 0 ? (
                <p className="text-white/40 text-sm py-4">
                  Your cart is empty.
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 pb-6 border-b border-white/5 last:border-0"
                  >
                    <div
                      className="w-16 h-16 shrink-0 rounded bg-center bg-cover grayscale hover:grayscale-0 transition-all duration-500"
                      style={{ backgroundImage: `url("${item.image}")` }}
                      role="img"
                      aria-hidden
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-sm font-light font-serif">
                        {item.name}
                      </h3>
                      <p className="text-white/40 text-xs tracking-wider">
                        {item.quantity} × Rs. {item.price.toFixed(2)}
                      </p>
                    </div>
                    <span className="text-primary font-light text-sm shrink-0">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="p-1 text-white/40 hover:text-white"
                      aria-label={`Remove ${item.name}`}
                    >
                      <CloseOutlinedIcon sx={{ fontSize: 18 }} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 shrink-0">
              <div className="flex justify-between text-xs tracking-widest uppercase text-white/40 mb-2">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="h-px bg-primary/20 my-3" />
              <div className="flex justify-between text-base text-white mb-6">
                <span className="font-serif">Total</span>
                <span className="text-primary font-serif font-bold">
                  Rs. {subtotal.toFixed(2)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full text-center px-6 py-4 bg-gold text-obsidian font-medium font-serif text-sm tracking-wide hover:bg-gold/90 transition-all rounded shadow-lg shadow-gold/10 disabled:opacity-50 disabled:pointer-events-none"
                aria-disabled={items.length === 0}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </CartContext.Provider>
  );
}
