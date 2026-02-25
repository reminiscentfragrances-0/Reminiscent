"use client";

import { useRef } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ProductCard, { Product } from "./ProductCard";
import { useCart } from "../context/CartContext";

interface ProductCarouselProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  onAddToCart?: (product: Product) => void;
}

export default function ProductCarousel({
  title = "The Signature Series",
  subtitle = "Curated Olfactory Memories",
  products = [],
  onAddToCart,
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cart = useCart();

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      cart.addItem({
        productId: product.id,
        slug: product.slug ?? product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      cart.openCart();
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === "left" ? -420 : 420;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-24 px-6 lg:px-40 bg-background-dark">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="px-4">
          <h2 className="font-[family-name:var(--font-serif)] text-4xl lg:text-5xl text-parchment mb-2">
            {title}
          </h2>
          <p className="text-parchment/60 uppercase tracking-[0.3em] text-[10px]">
            {subtitle}
          </p>
        </div>
        <div className="flex gap-4 px-4">
          <button
            onClick={() => scroll("left")}
            className="h-12 w-12 rounded-full border border-travertine/30 flex items-center justify-center text-parchment hover:bg-parchment/5 transition-colors"
            aria-label="Scroll left"
          >
            <ArrowBackOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-12 w-12 rounded-full border border-travertine/30 flex items-center justify-center text-parchment hover:bg-parchment/5 transition-colors"
            aria-label="Scroll right"
          >
            <ArrowForwardOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>

      {/* Cards Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-8 pb-8 no-scrollbar scroll-smooth"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
