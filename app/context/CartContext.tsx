"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import Link from "next/link";

const cartItems = [
  {
    name: "Whisper of Pines",
    detail: "50ml · Hand-blown Glass",
    price: "$320",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnjc-lXtFB8NugJuPqycdjl6qm40Tgd5-7XQ3M5UQG0Ld-HV7SI_4OYN1ILq2Pvh74wFS1MNyYVUFKobRSiWqfsEvgvtZ6pQdfdYVynh4VBTBTXcHbb0tvojiNbkgJZRHpdTiy8a4ly2hGnHpo3VCav8UjGEWFGno8WpMMwRuum6VVsg6-Y1XUWhjnsdSMGobLzV58jyYk36_qsp-v3DAyDAaJXecmpHP56_GQyj962paJyb0JrC0HB97ePtspKwdZp9_6rEfPg-Jn",
  },
  {
    name: "Midnight Ember",
    detail: "Burner · Obsidian Stone",
    price: "$180",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2NZV78nZ-swFACPPT9KV2ohm42Q4Vvv_HL7weefOOqdDb6PUanrgopbrLxbAQJO7Z86EkJ-TtyZfoc3Nm9ogJmP6Vb1r9SHajQNRUmyTDeLPAroV6TLME6ojffrlamtI3e2hJ_fJyxnGwWvwgm8opFIDgS-jYmoWpL-KHfRtCTUNtP4HfqL6MJnOWkfajTyQR1Wp4G-noC51RUSX5zGhOUetuRtdpYaCDN9YFBeQRIuUi6wJTx1-dSeYmGVnUxh_yodz7PQ_KCiEj",
  },
];

const subtotal = 500;

type CartContextValue = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, closeCart]);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
        itemCount: cartItems.length,
      }}
    >
      {children}
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Close cart"
        onClick={closeCart}
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:bg-black/40 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
                close
              </span>
            </button>
          </div>

          {/* Items + total */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.name}
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
                      {item.detail}
                    </p>
                  </div>
                  <span className="text-primary font-light text-sm shrink-0">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 shrink-0">
              <div className="flex justify-between text-xs tracking-widest uppercase text-white/40 mb-2">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="h-px bg-primary/20 my-3" />
              <div className="flex justify-between text-base text-white mb-6">
                <span className="font-serif">Total</span>
                <span className="text-primary font-serif font-bold">
                  ${subtotal}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full text-center px-6 py-4 bg-gold text-obsidian font-medium font-serif text-sm tracking-wide hover:bg-gold/90 transition-all rounded shadow-lg shadow-gold/10"
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
