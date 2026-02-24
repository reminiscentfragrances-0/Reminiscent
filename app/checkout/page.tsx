"use client";

import { useState } from "react";
import Link from "next/link";
import { SideNav, Header, Footer } from "../components";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!fullName.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: fullName.trim(),
          customerEmail: email.trim(),
          deliveryAddress: deliveryAddress.trim() || undefined,
          note: note.trim() || undefined,
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to place order.");
        return;
      }
      setOrderNumber(data.orderNumber);
      clearCart();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (orderNumber) {
    return (
      <>
        <SideNav />
        <Header />
        <main className="relative flex-1 bg-obsidian text-white selection:bg-gold/30 min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="font-serif text-3xl md:text-4xl text-gold mb-4 italic">
              Thank You
            </h1>
            <p className="text-white/80 mb-2">
              Your order has been received. Our messenger will contact you to
              arrange the exchange.
            </p>
            <p className="text-white/60 text-sm mb-8">
              Order reference:{" "}
              <strong className="text-gold">{orderNumber}</strong>
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-gold text-obsidian font-medium hover:bg-gold/90 rounded transition-colors"
            >
              Return to Sanctuary
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SideNav />
      <Header />
      <main className="relative flex-1 bg-obsidian text-white selection:bg-gold/30">
        <div className="px-6 md:px-12 lg:px-24 pt-28 pb-20 max-w-[1400px] mx-auto w-full">
          <div className="flex flex-wrap gap-2 py-4 mb-8">
            <Link
              href="/"
              className="text-white/40 text-sm font-medium leading-normal hover:text-gold transition-colors"
            >
              Sanctuary
            </Link>
            <span className="text-white/20 text-sm font-medium leading-normal">
              /
            </span>
            <span className="text-gold text-sm font-medium leading-normal">
              Checkout
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            <div className="lg:col-span-7 flex flex-col gap-12">
              <section>
                <h1 className="font-serif text-white tracking-tight text-4xl md:text-[42px] font-light leading-tight pb-8 italic">
                  The Final Ritual
                </h1>
                <div className="bg-gold/5 border border-gold/20 p-6 md:p-8 rounded mb-12">
                  <p className="text-gold/90 text-sm leading-relaxed tracking-wide italic">
                    We honor simplicity and presence — all transactions are cash
                    only, keeping your experience intimate and grounded. Our
                    messenger will arrive at your door to exchange your selected
                    essence for physical presence.
                  </p>
                </div>
                <h2 className="text-white text-lg font-light tracking-widest uppercase border-b border-white/10 pb-4 mb-8">
                  Personal Sanctuary
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="The Curator"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-transparent border-0 border-b border-gold/30 focus:border-gold focus:ring-0 text-white placeholder:text-white/10 py-2 transition-all outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="memories@forest.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent border-0 border-b border-gold/30 focus:border-gold focus:ring-0 text-white placeholder:text-white/10 py-2 transition-all outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest">
                      Delivery Coordinates
                    </label>
                    <input
                      type="text"
                      placeholder="Where the silver birch meets the street…"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="bg-transparent border-0 border-b border-gold/30 focus:border-gold focus:ring-0 text-white placeholder:text-white/10 py-2 transition-all outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest">
                      Intimate Note (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="A memory you wish to evoke…"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="bg-transparent border-0 border-b border-gold/30 focus:border-gold focus:ring-0 text-white placeholder:text-white/10 py-2 resize-none transition-all outline-none"
                    />
                  </div>
                  {error && (
                    <p className="md:col-span-2 text-red-400 text-sm">
                      {error}
                    </p>
                  )}
                  <div className="pt-4 md:col-span-2">
                    <button
                      type="submit"
                      disabled={submitting || items.length === 0}
                      className="w-full md:w-auto px-12 md:px-16 py-5 bg-gold text-obsidian font-medium font-serif text-lg md:text-xl hover:bg-gold/90 transition-all rounded shadow-lg shadow-gold/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting
                        ? "Placing order…"
                        : "Confirm Presence & Exchange"}
                    </button>
                  </div>
                </form>
              </section>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-28 border border-white/10 p-8 md:p-10 bg-white/[0.02]">
                <h2 className="text-white text-sm font-light tracking-widest uppercase mb-10">
                  Your Selected Essences
                </h2>
                {items.length === 0 ? (
                  <p className="text-white/40 text-sm py-4">
                    Your cart is empty.
                  </p>
                ) : (
                  <>
                    <div className="flex flex-col gap-8">
                      {items.map((item) => (
                        <div
                          key={item.productId}
                          className="flex items-center gap-6 pb-8 border-b border-white/5 last:border-0 last:pb-0"
                        >
                          <div
                            className="w-20 h-20 shrink-0 bg-center bg-no-repeat bg-cover rounded grayscale hover:grayscale-0 transition-all duration-700"
                            style={{ backgroundImage: `url("${item.image}")` }}
                            role="img"
                            aria-label={item.name}
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white text-base font-light font-serif">
                              {item.name}
                            </h3>
                            <p className="text-white/40 text-xs tracking-wider">
                              {item.quantity} × Rs. {item.price.toFixed(2)}
                            </p>
                          </div>
                          <span className="text-gold font-light text-sm shrink-0">
                            Rs. {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-10 flex flex-col gap-4">
                      <div className="flex justify-between text-xs tracking-widest uppercase text-white/40">
                        <span>Subtotal</span>
                        <span>Rs. {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs tracking-widest uppercase text-white/40">
                        <span>Messenger Fee</span>
                        <span>Rs. 0 (Our Compliments)</span>
                      </div>
                      <div className="h-px bg-gold/20 my-2" />
                      <div className="flex justify-between text-lg text-white">
                        <span className="font-serif">Total Exchange</span>
                        <span className="text-gold font-serif font-bold">
                          Rs. {subtotal.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/30 text-center mt-6 italic">
                        * To be provided in physical currency upon arrival.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
