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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductSku, setNewProductSku] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Parfum");
  const [newProductPrice, setNewProductPrice] = useState<number | "">("");
  const [newProductStock, setNewProductStock] = useState<number | "">("");

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

  const handleAddProduct = () => {
    if (!newProductName.trim() || !newProductSku.trim()) return;
    const price = typeof newProductPrice === "number" ? newProductPrice : 0;
    const stock = typeof newProductStock === "number" ? newProductStock : 0;
    const nextId = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1;

    setProducts([
      ...products,
      {
        id: nextId,
        name: newProductName.trim(),
        sku: newProductSku.trim(),
        stock,
        price,
        category: newProductCategory,
      },
    ]);

    setIsAddModalOpen(false);
    setNewProductName("");
    setNewProductSku("");
    setNewProductCategory("Parfum");
    setNewProductPrice("");
    setNewProductStock("");
  };

  return (
    <div className="min-h-screen bg-obsidian text-parchment font-extralight selection:bg-primary/30 font-display">
      {/* Sidebar / Header */}
      <header className="border-b border-travertine/20 bg-background-darker/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="font-serif italic text-2xl tracking-tight hover:text-primary transition-colors"
            >
              Reminiscent
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveTab("inventory")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "inventory"
                    ? "bg-background-darker text-parchment"
                    : "text-parchment/60 hover:bg-white/5"
                }`}
              >
                Inventory
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "orders"
                    ? "bg-background-darker text-parchment"
                    : "text-parchment/60 hover:bg-white/5"
                }`}
              >
                Orders
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-background-darker border border-travertine/30 flex items-center justify-center text-xs font-serif italic shadow-lg shadow-black/20">
              AD
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl font-light italic mb-2 text-parchment">
              {activeTab === "inventory" ? "Stock Ledger" : "Order Chronology"}
            </h1>
            <p className="text-parchment/60 text-sm tracking-wide">
              {activeTab === "inventory"
                ? "Oversee the physical remnants of our olfactory creations."
                : "Track the journey of essences from our sanctuary to theirs."}
            </p>
          </div>

          <div className="flex gap-4">
            {activeTab === "inventory" ? (
              <>
                <div className="bg-background-darker/40 border border-travertine/10 px-6 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-primary block mb-1">
                    Low Stock
                  </span>
                  <span className="text-xl font-light text-orange-400">
                    {lowStockCount} Items
                  </span>
                </div>
                <div className="bg-background-darker/40 border border-travertine/10 px-6 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-primary block mb-1">
                    Inventory Value
                  </span>
                  <span className="text-xl font-light text-parchment">
                    ${totalValue.toLocaleString()}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="bg-background-darker/40 border border-travertine/10 px-6 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-primary block mb-1">
                    In Transit
                  </span>
                  <span className="text-xl font-light text-amber-400">
                    {activeOrders} Rites
                  </span>
                </div>
                <div className="bg-background-darker/40 border border-travertine/10 px-6 py-3 rounded-lg backdrop-blur-sm">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-primary block mb-1">
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
                  className="bg-background-darker/60 border border-travertine/10 rounded-xl p-6 hover:border-travertine/30 transition-all group relative overflow-hidden"
                >
                  {product.stock < 10 && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-orange-500/10 text-orange-400 text-[8px] uppercase tracking-widest border-b border-l border-orange-500/20 rounded-bl-lg">
                      Scarcity
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-widest text-primary mb-1 block">
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
                        className="bg-transparent border-0 p-0 text-parchment/40 text-xs mt-1 focus:ring-0 outline-none transition-colors w-full"
                        spellCheck={false}
                      />
                    </div>
                    <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-md border border-travertine/5 hover:border-travertine/20 transition-all">
                      <span className="text-primary text-[10px]">$</span>
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
                        className="bg-transparent border-0 p-0 font-serif font-light text-right w-12 focus:ring-0 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-travertine/10 pt-6 mt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-parchment/40 mb-1">
                        Stock Level
                      </span>
                      <span
                        className={`text-2xl font-light ${
                          product.stock < 10 ? "text-orange-400" : "text-parchment"
                        }`}
                      >
                        {product.stock}{" "}
                        <span className="text-xs text-parchment/40 uppercase">
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

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="border-2 border-dashed border-travertine/10 rounded-xl flex flex-col items-center justify-center p-6 text-parchment/60 hover:border-travertine/30 hover:bg-white/5 transition-all group min-h-[220px]"
              >
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
            <div className="bg-background-darker/60 border border-travertine/10 rounded-xl overflow-hidden backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-travertine/10">
                      <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-primary font-medium">
                        Reference
                      </th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-primary font-medium">
                        Curator
                      </th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-primary font-medium">
                        Exchange Date
                      </th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-primary font-medium">
                        Essences
                      </th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-primary font-medium">
                        Value
                      </th>
                      <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-primary font-medium">
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
                        <td className="px-6 py-6 text-parchment/60 text-sm">
                          {order.date}
                        </td>
                        <td className="px-6 py-6 text-parchment/60 text-sm">
                          {order.items}
                        </td>
                        <td className="px-6 py-6 font-serif">
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
                            <option value="Processing" className="bg-background-darker">
                              Processing
                            </option>
                            <option value="Shipped" className="bg-background-darker">
                              Shipped
                            </option>
                            <option value="Delivered" className="bg-background-darker">
                              Delivered
                            </option>
                            <option value="Cancelled" className="bg-background-darker">
                              Cancelled
                            </option>
                          </select>
                        </td>
                        <td className="px-6 py-6">
                          <button className="text-parchment/40 hover:text-parchment transition-colors">
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
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-travertine/10 text-parchment/40 text-[10px] uppercase tracking-[0.2em] flex justify-between items-center">
        <span>Reminiscent Back Office — Ritual Ledger v1.0</span>
        <span>© {new Date().getFullYear()} All Memories Reserved</span>
      </footer>

      {isAddModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl bg-background-dark border border-travertine/20 shadow-2xl shadow-black/40 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl italic text-parchment">
                  Manifest New Essence
                </h2>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-parchment/60 hover:text-parchment transition-colors"
                  aria-label="Close"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-parchment/60 mb-1">
                    Name
                  </label>
                  <input
                    className="w-full bg-background-darker border border-travertine/30 rounded-md px-3 py-2 text-sm text-parchment placeholder:text-parchment/30 focus:outline-none focus:border-primary"
                    placeholder="Winter Orchard"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-parchment/60 mb-1">
                    SKU
                  </label>
                  <input
                    className="w-full bg-background-darker border border-travertine/30 rounded-md px-3 py-2 text-sm text-parchment placeholder:text-parchment/30 focus:outline-none focus:border-primary"
                    placeholder="RF-XXX-50"
                    value={newProductSku}
                    onChange={(e) => setNewProductSku(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-parchment/60 mb-1">
                      Category
                    </label>
                    <select
                      className="w-full bg-background-darker border border-travertine/30 rounded-md px-3 py-2 text-sm text-parchment focus:outline-none focus:border-primary"
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value)}
                    >
                      <option value="Parfum">Parfum</option>
                      <option value="Extract">Extract</option>
                      <option value="Room Scent">Room Scent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-parchment/60 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      min={0}
                      className="w-full bg-background-darker border border-travertine/30 rounded-md px-3 py-2 text-sm text-parchment placeholder:text-parchment/30 focus:outline-none focus:border-primary"
                      placeholder="0"
                      value={newProductStock}
                      onChange={(e) =>
                        setNewProductStock(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-parchment/60 mb-1">
                    Price
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-parchment/60 text-sm">$</span>
                    <input
                      type="number"
                      min={0}
                      className="w-full bg-background-darker border border-travertine/30 rounded-md px-3 py-2 text-sm text-parchment placeholder:text-parchment/30 focus:outline-none focus:border-primary"
                      placeholder="0"
                      value={newProductPrice}
                      onChange={(e) =>
                        setNewProductPrice(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-[0.2em] text-parchment/60 hover:text-parchment"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="px-5 py-2 text-xs uppercase tracking-[0.2em] bg-primary text-ink rounded-md hover:bg-primary/90"
                >
                  Save Essence
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
