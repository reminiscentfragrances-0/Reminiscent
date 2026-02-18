"use client";

import Link from "next/link";
import { SideNav, Header, Footer } from "../components";

const summaryItems = [
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

export default function CheckoutPage() {
  return (
    <>
      <SideNav />
      <Header />
      <main className="relative flex-1 px-6 md:px-12 lg:px-24 pt-28 pb-20 max-w-[1400px] mx-auto w-full">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 py-4 mb-8">
          <Link
            href="/"
            className="text-white/40 text-sm font-medium leading-normal hover:text-primary transition-colors"
          >
            Sanctuary
          </Link>
          <span className="text-white/20 text-sm font-medium leading-normal">
            /
          </span>
          <span className="text-primary text-sm font-medium leading-normal">
            Checkout
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left: Checkout Details */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <section>
              <h1 className="font-serif text-white tracking-tight text-4xl md:text-[42px] font-light leading-tight pb-8 italic">
                The Final Ritual
              </h1>

              {/* Notice */}
              <div className="bg-primary/5 border border-primary/20 p-6 md:p-8 rounded-lg mb-12">
                <p className="text-primary/90 text-sm leading-relaxed tracking-wide italic">
                  We honor simplicity and presence — all transactions are cash
                  only, keeping your experience intimate and grounded. Our
                  messenger will arrive at your door to exchange your selected
                  essence for physical presence.
                </p>
              </div>

              <h2 className="text-white text-lg font-light tracking-widest uppercase border-b border-white/10 pb-4 mb-8">
                Personal Sanctuary
              </h2>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="The Curator"
                    className="bg-transparent border-0 border-b border-primary/30 focus:border-primary focus:ring-0 text-white placeholder:text-white/10 py-2 transition-all outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="memories@forest.com"
                    className="bg-transparent border-0 border-b border-primary/30 focus:border-primary focus:ring-0 text-white placeholder:text-white/10 py-2 transition-all outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest">
                    Delivery Coordinates
                  </label>
                  <input
                    type="text"
                    placeholder="Where the silver birch meets the street…"
                    className="bg-transparent border-0 border-b border-primary/30 focus:border-primary focus:ring-0 text-white placeholder:text-white/10 py-2 transition-all outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest">
                    Intimate Note (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="A memory you wish to evoke…"
                    className="bg-transparent border-0 border-b border-primary/30 focus:border-primary focus:ring-0 text-white placeholder:text-white/10 py-2 resize-none transition-all outline-none"
                  />
                </div>
              </form>
            </section>

            <div className="pt-4">
              <button
                type="button"
                className="w-full md:w-auto px-12 md:px-16 py-5 bg-primary text-white font-medium font-serif text-lg md:text-xl hover:bg-primary/90 transition-all rounded-lg shadow-lg shadow-primary/10"
              >
                Confirm Presence &amp; Exchange
              </button>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 border border-white/10 p-8 md:p-10 rounded-lg bg-white/[0.02]">
              <h2 className="text-white text-sm font-light tracking-widest uppercase mb-10">
                Your Selected Essences
              </h2>

              <div className="flex flex-col gap-8">
                {summaryItems.map((item) => (
                  <div
                    key={item.name}
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
                        {item.detail}
                      </p>
                    </div>
                    <span className="text-primary font-light text-sm shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4">
                <div className="flex justify-between text-xs tracking-widest uppercase text-white/40">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-xs tracking-widest uppercase text-white/40">
                  <span>Messenger Fee</span>
                  <span>$0 (Our Compliments)</span>
                </div>
                <div className="h-px bg-primary/20 my-2" />
                <div className="flex justify-between text-lg text-white">
                  <span className="font-serif">Total Exchange</span>
                  <span className="text-primary font-serif font-bold">
                    ${subtotal}
                  </span>
                </div>
                <p className="text-[10px] text-white/30 text-center mt-6 italic">
                  * To be provided in physical currency upon arrival.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
