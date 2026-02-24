"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { SideNav, Header, Footer } from "../components";
import { useCart } from "../context/CartContext";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  price: number;
  category: string;
  tagline?: string;
}

const staticCategories = [
  { id: "all", label: "Archives" },
  { id: "parfum", label: "Signature" },
  { id: "earthy", label: "Earthy" },
  { id: "floral", label: "Floral" },
  { id: "oceanic", label: "Oceanic" },
];

export default function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const cart = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter(
      (p) => p.category?.toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [products, activeCategory]);

  const handleAddToCart = (product: Product) => {
    cart.addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.heroImage,
      quantity: 1,
    });
    cart.openCart();
  };

  return (
    <div className="bg-background-dark min-h-screen">
      <SideNav />
      <Header />

      <main className="relative z-20 px-6 lg:px-40 pt-40 pb-32 max-w-[1400px]">
        {/* Simplified Header with Category Navigation */}
        <div className="flex flex-col gap-12 mb-20">
          <div className="flex flex-col gap-4">
            <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-6xl text-parchment leading-tight text-glow">
              <span className="italic font-light opacity-80">Archives</span>
            </h1>
            <p className="text-parchment/40 uppercase tracking-[0.4em] text-[10px] md:text-xs">
              A curated sanctuary of sensory memories
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-travertine/10 pb-8">
            <div className="flex gap-8 md:gap-12 overflow-x-auto w-full md:w-auto no-scrollbar">
              {staticCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] transition-all relative py-2 ${
                    activeCategory === cat.id
                      ? "text-primary"
                      : "text-parchment/40 hover:text-parchment"
                  }`}
                >
                  {cat.label}
                  {activeCategory === cat.id && (
                    <span className="absolute bottom-0 left-0 w-full h-px bg-primary animate-in fade-in" />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4 text-parchment/40 text-[10px] uppercase tracking-[0.2em]">
              <span>Showing {filteredProducts.length} Histories</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-8">
                  <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  <div
                    className="w-full h-full bg-center bg-cover grayscale group-hover:grayscale-0 transform group-hover:scale-110 transition-all duration-1000"
                    style={{ backgroundImage: `url("${product.heroImage}")` }}
                  />
                  {product.category && (
                    <div className="absolute top-6 left-6 z-20">
                      <span className="px-3 py-1 bg-obsidian/60 backdrop-blur-md border border-travertine/20 text-[8px] uppercase tracking-[0.3em] text-parchment font-bold rounded-full">
                        {product.category}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="flex flex-col gap-2">
                <Link href={`/product/${product.slug}`}>
                  <h3 className="font-[family-name:var(--font-serif)] text-3xl text-parchment group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-parchment/40 text-[10px] md:text-xs uppercase tracking-[0.2em] font-light">
                  {product.tagline || product.category}
                </p>
                <p className="text-parchment/60 text-sm mt-2 line-clamp-2 italic font-light leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-8 flex items-center justify-between group/btn">
                  <span className="text-parchment font-medium text-lg">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-3 text-parchment/40 group-hover:text-primary transition-colors"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                      Add to Cart
                    </span>
                    <span className="material-symbols-outlined text-2xl">
                      add_shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="py-40 text-center animate-in fade-in zoom-in-95 duration-1000">
            <p className="text-parchment/20 font-[family-name:var(--font-serif)] italic text-3xl lg:text-5xl">
              This chapter is yet to be written.
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-12 text-primary text-[10px] font-bold uppercase tracking-[0.5em] border border-primary/20 px-8 py-4 rounded-full hover:bg-primary hover:text-obsidian transition-all"
            >
              Return to Archives
            </button>
          </div>
        )}

        {/* View More Decor */}
        {!loading && filteredProducts.length > 0 && (
          <div className="flex flex-col items-center mt-40">
            <div className="w-[1px] h-32 bg-linear-to-b from-travertine/40 to-transparent" />
            <span className="mt-8 text-parchment/20 text-[10px] uppercase tracking-[0.8em]"></span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
