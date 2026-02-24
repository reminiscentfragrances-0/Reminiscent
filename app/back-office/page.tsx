"use client";

import { useState } from "react";
import Link from "next/link";

// Mock Data
const initialProducts = [
  {
    id: 1,
    name: "Whisper of Pines",
    sku: "RF-WOP-50",
    stock: 15,
    price: 320,
    category: "Parfum",
  },
  {
    id: 2,
    name: "Midnight Ember",
    sku: "RF-MBE-100",
    stock: 8,
    price: 180,
    category: "Room Scent",
  },
  {
    id: 3,
    name: "Silver Birch",
    sku: "RF-SBR-50",
    stock: 22,
    price: 250,
    category: "Parfum",
  },
  {
    id: 4,
    name: "Moonlit Mist",
    sku: "RF-MLM-50",
    stock: 5,
    price: 290,
    category: "Parfum",
  },
  {
    id: 5,
    name: "Ancient Resin",
    sku: "RF-ANR-30",
    stock: 12,
    price: 410,
    category: "Extract",
  },
];

const initialOrders = [
  {
    id: "ORD-1204",
    customer: "Julian Thorne",
    date: "2024-02-18",
    total: 320,
    status: "Processing",
    items: 1,
  },
  {
    id: "ORD-1203",
    customer: "Elena Vance",
    date: "2024-02-17",
    total: 680,
    status: "Shipped",
    items: 2,
  },
  {
    id: "ORD-1202",
    customer: "Marcus Aurelius",
    date: "2024-02-16",
    total: 180,
    status: "Delivered",
    items: 1,
  },
  {
    id: "ORD-1201",
    customer: "Seraphina Peak",
    date: "2024-02-15",
    total: 410,
    status: "Cancelled",
    items: 1,
  },
];

export default function BackOfficePage() {
  const [activeTab, setActiveTab] = useState<"inventory" | "orders">(
    "inventory",
  );
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);

  const updateStock = (id: number, delta: number) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p,
      ),
    );
  };

  const updateProduct = (id: number, field: string, value: string | number) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const updateOrderStatus = (id: string, status: string) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const lowStockCount = products.filter((p) => p.stock < 10).length;
  const totalValue = products.reduce((acc, p) => acc + p.stock * p.price, 0);
  const activeOrders = orders.filter(
    (o) => o.status !== "Delivered" && o.status !== "Cancelled",
  ).length;
  const totalRevenue = orders
    .filter((o) => o.status === "Delivered")
    .reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="min-h-screen bg-obsidian text-mint selection:bg-hunter/30 font-display">
      {/* Sidebar / Header */}
      <header className="border-b border-travertine/20 bg-spruce/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="font-serif italic text-2xl tracking-tight text-mint hover:text-sage transition-colors"
            >
              Reminiscent
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveTab("inventory")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "inventory" ? "bg-hunter text-mint" : "text-mint/60 hover:text-mint hover:bg-white/5"}`}
              >
                Inventory
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "orders" ? "bg-hunter text-mint" : "text-mint/60 hover:text-mint hover:bg-white/5"}`}
              >
                Orders
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-hunter border border-travertine/30 flex items-center justify-center text-xs font-serif italic shadow-lg shadow-hunter/20">
              AD
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl font-light italic mb-2">
              {activeTab === "inventory" ? "Stock Ledger" : "Order Chronology"}
            </h1>
            <p className="text-mint/50 text-sm tracking-wide">
              {activeTab === "inventory"
                ? "Oversee the physical remnants of our olfactory creations."
                : "Track the journey of essences from our sanctuary to theirs."}
            </p>
          </div>

          <div className="flex gap-4">
            {activeTab === "inventory" ? (
              <>
                <div className="bg-spruce/20 border border-travertine/10 px-6 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-sage block mb-1">
                    Low Stock
                  </span>
                  <span className="text-xl font-light text-orange-400">
                    {lowStockCount} Items
                  </span>
                </div>
                <div className="bg-spruce/20 border border-travertine/10 px-6 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-sage block mb-1">
                    Inventory Value
                  </span>
                  <span className="text-xl font-light text-mint">
                    ${totalValue.toLocaleString()}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="bg-spruce/20 border border-travertine/10 px-6 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-sage block mb-1">
                    In Transit
                  </span>
                  <span className="text-xl font-light text-amber-400">
                    {activeOrders} Rites
                  </span>
                </div>
                <div className="bg-spruce/20 border border-travertine/10 px-6 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-sage block mb-1">
                    Realized Revenue
                  </span>
                  <span className="text-xl font-light text-emerald-400">
                    ${totalRevenue.toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {activeTab === "inventory" ? (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-spruce/30 border border-travertine/10 rounded-xl p-6 hover:border-travertine/30 transition-all group relative overflow-hidden"
                >
                  {product.stock < 10 && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-orange-500/10 text-orange-400 text-[8px] uppercase tracking-widest border-b border-l border-orange-500/20 rounded-bl-lg">
                      Scarcity
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-widest text-sage mb-1 block">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-serif font-light">
                        {product.name}
                      </h3>
                      <input
                        defaultValue={product.sku}
                        onBlur={(e) =>
                          updateProduct(product.id, "sku", e.target.value)
                        }
                        className="bg-transparent border-0 p-0 text-mint/40 text-xs mt-1 focus:ring-0 focus:text-mint outline-none transition-colors w-full"
                        spellCheck={false}
                      />
                    </div>
                    <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-md border border-travertine/5 hover:border-travertine/20 transition-all">
                      <span className="text-sage text-[10px]">$</span>
                      <input
                        type="number"
                        defaultValue={product.price}
                        onBlur={(e) =>
                          updateProduct(
                            product.id,
                            "price",
                            parseInt(e.target.value),
                          )
                        }
                        className="bg-transparent border-0 p-0 text-mint font-serif font-light text-right w-12 focus:ring-0 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-travertine/10 pt-6 mt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-mint/40 mb-1">
                        Stock Level
                      </span>
                      <span
                        className={`text-2xl font-light ${product.stock < 10 ? "text-orange-400" : "text-mint"}`}
                      >
                        {product.stock}{" "}
                        <span className="text-xs text-mint/40 uppercase">
                          units
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateStock(product.id, -1)}
                        className="w-10 h-10 rounded-lg border border-travertine/20 flex items-center justify-center hover:bg-white/5 hover:border-travertine/40 transition-all text-xl"
                      >
                        -
                      </button>
                      <button
                        onClick={() => updateStock(product.id, 1)}
                        className="w-10 h-10 rounded-lg border border-travertine/20 flex items-center justify-center hover:bg-white/5 hover:border-travertine/40 transition-all text-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button className="border-2 border-dashed border-travertine/10 rounded-xl flex flex-col items-center justify-center p-6 text-mint/30 hover:text-mint hover:border-travertine/30 hover:bg-white/5 transition-all group min-h-[220px]">
                <span className="material-symbols-outlined text-4xl mb-2 group-hover:scale-110 transition-transform">
                  add_circle
                </span>
                <span className="text-sm font-medium">
                  Manifest New Essence
                </span>
              </button>
            </div>
          </section>
        ) : (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-spruce/30 border border-travertine/10 rounded-xl overflow-hidden backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-travertine/10">
                      <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-sage font-medium">
                        Reference
                      </th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-sage font-medium">
                        Curator
                      </th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-sage font-medium">
                        Exchange Date
                      </th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-sage font-medium">
                        Essences
                      </th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-sage font-medium">
                        Value
                      </th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-sage font-medium">
                        Incarnation State
                      </th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-sage font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-travertine/5 hover:bg-white/5 transition-colors group"
                      >
                        <td className="px-6 py-6 font-medium text-xs tracking-wider">
                          {order.id}
                        </td>
                        <td className="px-6 py-6 font-serif italic text-base">
                          {order.customer}
                        </td>
                        <td className="px-6 py-6 text-mint/60 text-sm">
                          {order.date}
                        </td>
                        <td className="px-6 py-6 text-mint/60 text-sm">
                          {order.items}
                        </td>
                        <td className="px-6 py-6 font-serif text-mint">
                          ${order.total}
                        </td>
                        <td className="px-6 py-6 border-0">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(order.id, e.target.value)
                            }
                            className={`bg-transparent border-0 p-0 text-[10px] uppercase tracking-widest font-bold cursor-pointer focus:ring-0 ${
                              order.status === "Delivered"
                                ? "text-emerald-400"
                                : order.status === "Shipped"
                                  ? "text-blue-400"
                                  : order.status === "Processing"
                                    ? "text-amber-400"
                                    : "text-rose-400"
                            }`}
                          >
                            <option value="Processing" className="bg-spruce">
                              Processing
                            </option>
                            <option value="Shipped" className="bg-spruce">
                              Shipped
                            </option>
                            <option value="Delivered" className="bg-spruce">
                              Delivered
                            </option>
                            <option value="Cancelled" className="bg-spruce">
                              Cancelled
                            </option>
                          </select>
                        </td>
                        <td className="px-6 py-6">
                          <button className="text-mint/40 hover:text-mint transition-colors">
                            <span className="material-symbols-outlined text-lg">
                              receipt_long
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-travertine/10 text-mint/20 text-[10px] uppercase tracking-[0.2em] flex justify-between items-center">
        <span>Reminiscent Back Office — Ritual Ledger v1.0</span>
        <span>© {new Date().getFullYear()} All Memories Reserved</span>
      </footer>
    </div>
  );
}
