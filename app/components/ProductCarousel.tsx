"use client";

import { useRef } from "react";
import ProductCard, { Product } from "./ProductCard";

interface ProductCarouselProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  onAddToCart?: (product: Product) => void;
}

const defaultProducts: Product[] = [
  {
    id: "linger",
    name: "Linger",
    description: "Sandalwood, Dried Petal & Aged Paper",
    price: 180.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpGTdYGeEISkxEh3_CBqjrOk8Cwzml6NWbfcwR8j4EM6_R4l6gsMXC13xAtTjrUOJk_2nW_MFCX3OBQjChk8qfqWtVVNdLkIZSAc7lQE46LDSLb58VNAsdH09jwvxts3xebHllMVd3VfLBxfJGrJgllE608sMPKsJI4y1tUMdChgj_7oNzsRn42ySTeZh2D3pLWV-z8f23mUJJOZHpeEs7remC6qymBb8r5rPF_Werypns9aItLKs2HLy-heEnawOvnscnek8B",
    badge: "Batch 001",
  },
  {
    id: "trace",
    name: "Trace",
    description: "Cold Stone, Bergamot & Sea Salt",
    price: 210.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYsKv1-qhQngP_xyRgTgqCMszMkhghKUzePDg6s6Lz13coeH4qcPIksAlgGO_b7r0XlknfP4IXxgmCnj6Advhw_djUoNfxoclyk_aDAQSBy40CZv7-OKNTRKh3xwZSxs6-fkHKmZ6F8L8l-aRpYLGehXUeSoP28tl2b66aaWOi6L4ccyOb6LEOrSHovSXpSg-L9uL1ZjdRCHW4tTS0-OMqafTsyFYcJeJ5FfpXvPvF6Ca01dFLnYexAAwGCLaWenBt3i9TNPKm",
    badge: "Limited Edition",
  },
  {
    id: "recall",
    name: "Recall",
    description: "Dusty Paper, Amber & White Musk",
    price: 195.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApbVxIF4MXGibTFX8DFEURSn2y9i0eB6_Wj8ijXeidYcaQB2j5QL6m17ejbZSw_vpOFWXORgBFg10X37Q0To4sNrXOdcjmsWGmQWg9bVHIOWigsYDv5hObllvkqTMSJH7CbFmUt0oCjTYr4Cxgd2czL7pqpbuiO9CfTH2jjdWURmHnXFwOA3crO-85d-r8nkIsa5jAoX5zTHTAlXfDv7eEg_cXQmDKnDFfPMi7gI3wIayZ8ea4gWWa9ICmIMb6lFxGBZQe814y",
    badge: "Archive",
  },
];

export default function ProductCarousel({
  title = "The Signature Series",
  subtitle = "Curated Olfactory Memories",
  products = defaultProducts,
  onAddToCart,
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
          <h2 className="font-[family-name:var(--font-serif)] text-4xl lg:text-5xl text-white mb-2">
            {title}
          </h2>
          <p className="text-white/40 uppercase tracking-[0.3em] text-[10px]">
            {subtitle}
          </p>
        </div>
        <div className="flex gap-4 px-4">
          <button
            onClick={() => scroll("left")}
            className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined">west</span>
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined">east</span>
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
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
