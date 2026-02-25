"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";
import NatureOutlinedIcon from "@mui/icons-material/NatureOutlined";
import OilBarrelOutlinedIcon from "@mui/icons-material/OilBarrelOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const ICON_MAP: Record<string, React.ElementType> = {
  oil_barrel: OilBarrelOutlinedIcon,
  schedule: ScheduleOutlinedIcon,
  wc: WcOutlinedIcon,
  wb_sunny: WbSunnyOutlinedIcon,
  payments: PaymentsOutlinedIcon,
};

export type ProductDetailData = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  priceLabel: string;
  heroImage: string;
  concentration: string;
  longevity: string;
  projection: string;
  sizes: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
};

type OtherProduct = {
  id: string;
  slug: string;
  name: string;
  label: string;
  image: string;
};

type Review = {
  id: string;
  authorName: string;
  quote: string;
  createdAt: string;
  rating?: number | null;
};

interface ProductDetailClientProps {
  product: ProductDetailData;
  otherProducts: OtherProduct[];
}

const FEATURES = [
  { icon: "oil_barrel", label: "Premium Oil" },
  { icon: "schedule", label: "Long-lasting" },
  { icon: "wc", label: "Unisex" },
  { icon: "wb_sunny", label: "Day & Evening" },
  { icon: "payments", label: "Cash on Delivery" },
];

export default function ProductDetailClient({
  product,
  otherProducts,
}: ProductDetailClientProps) {
  const { openCart, addItem } = useCart();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewQuote, setReviewQuote] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    const slug = product.slug || product.id;
    fetch(`/api/products/${slug}/reviews`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setReviews(data))
      .catch(() => {});
  }, [product.slug, product.id]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewQuote.trim() || reviewSubmitting) return;
    setReviewSubmitting(true);
    const slug = product.slug || product.id;
    const res = await fetch(`/api/products/${slug}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authorName: reviewAuthor.trim(),
        quote: reviewQuote.trim(),
        rating: reviewRating,
      }),
    });
    if (res.ok) {
      const created = await res.json();
      setReviews((prev) => [created, ...prev]);
      setReviewAuthor("");
      setReviewQuote("");
      setReviewRating(5);
    }
    setReviewSubmitting(false);
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.heroImage,
      quantity: 1,
    });
    openCart();
  };

  return (
    <main className="bg-background-dark text-slate-100 min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col md:flex-row pt-24">
        <div
          className="w-full md:w-1/2 h-[50vh] md:h-auto bg-cover bg-center shrink-0"
          aria-label={product.name}
          style={{ backgroundImage: `url("${product.heroImage}")` }}
        />
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-16 md:py-0 space-y-8">
          <div className="space-y-4">
            <span className="text-primary uppercase tracking-[0.4em] text-xs font-semibold">
              {product.tagline}
            </span>
            <h1 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight">
              {product.name}
              <br />
              <span className="italic font-light">A Memory That Breathes.</span>
            </h1>
            <p className="text-slate-400 max-w-md leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 py-6 border-y border-white/5">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary mb-1">
                Concentration
              </p>
              <p className="text-sm font-light">{product.concentration}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary mb-1">
                Longevity
              </p>
              <p className="text-sm font-light">{product.longevity}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary mb-1">
                Projection
              </p>
              <p className="text-sm font-light">{product.projection}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary mb-1">
                Size Options
              </p>
              <p className="text-sm font-light">{product.sizes}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div>
              <p className="text-2xl font-light tracking-tight">
                {product.priceLabel}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Includes all taxes
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="group relative flex items-center justify-center bg-background-darker border border-white/10 px-10 py-4 rounded-lg overflow-hidden transition-all hover:bg-black"
            >
              <span className="relative z-10 text-primary uppercase tracking-[0.2em] text-xs font-bold group-hover:text-white transition-colors">
                Add to Cart
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section
        id="story"
        className="py-32 px-6 md:px-20 max-w-5xl mx-auto text-center"
      >
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-primary uppercase tracking-[0.5em] text-xs font-semibold">
              Our Philosophy
            </h2>
            <h3 className="text-3xl md:text-4xl font-extralight">
              Every Drop Tells a Story.
            </h3>
          </div>
          <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto italic">
            &quot;We believe that scent is the most intense form of memory. It’s
            the invisible thread that connects us to our most cherished
            moments—the warmth of a first encounter, the crisp air of a
            forgotten morning, the essence of someone beloved.&quot;
          </p>
          <div className="pt-8 border-t border-white/5 max-w-md mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] font-light text-slate-100">
              Some fragrances fade. Some are forgotten.
              <br />
              <span className="text-primary font-medium mt-2 block">
                Reminiscent stays.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Scent Profile */}
      <section id="notes" className="py-32 bg-black/40">
        <div className="px-6 md:px-20 max-w-7xl mx-auto">
          <div className="mb-20 text-center space-y-2">
            <h2 className="text-3xl font-extralight tracking-widest uppercase">
              The Scent Profile
            </h2>
            <div className="h-px w-20 bg-primary mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <div className="flex flex-col items-center text-center space-y-6">
              <AirOutlinedIcon
                sx={{ color: "var(--primary)", fontSize: 40, fontWeight: 200 }}
              />
              <h4 className="text-sm uppercase tracking-[0.3em] font-semibold">
                Top Notes
              </h4>
              <p className="text-slate-400 font-light leading-relaxed">
                {product.topNotes}
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-6 md:border-x border-white/5 px-8">
              <LocalFloristOutlinedIcon
                sx={{ color: "var(--primary)", fontSize: 40, fontWeight: 200 }}
              />
              <h4 className="text-sm uppercase tracking-[0.3em] font-semibold">
                Heart Notes
              </h4>
              <p className="text-slate-400 font-light leading-relaxed">
                {product.heartNotes}
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-6">
              <NatureOutlinedIcon
                sx={{ color: "var(--primary)", fontSize: 40, fontWeight: 200 }}
              />
              <h4 className="text-sm uppercase tracking-[0.3em] font-semibold">
                Base Notes
              </h4>
              <p className="text-slate-400 font-light leading-relaxed">
                {product.baseNotes}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Fragrance */}
      <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {FEATURES.map((item) => {
            const IconComponent = ICON_MAP[item.icon];
            return (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center p-8 border border-white/5 rounded-lg text-center space-y-3"
              >
                {IconComponent && (
                  <IconComponent sx={{ color: "var(--primary)" }} />
                )}
                <span className="text-[10px] uppercase tracking-widest font-medium">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-32 bg-black/40">
        <div className="px-6 md:px-20 max-w-7xl mx-auto">
          <h2 className="text-center text-2xl font-extralight tracking-[0.4em] uppercase mb-20 italic">
            Voices That Remember
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-10 border border-white/5 bg-background-dark/40 rounded-xl space-y-6"
              >
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const isFilled = idx < (review.rating ?? 5);
                    return isFilled ? (
                      <StarIcon key={idx} sx={{ fontSize: 14 }} />
                    ) : (
                      <StarOutlineIcon
                        key={idx}
                        sx={{ fontSize: 14, opacity: 0.3 }}
                      />
                    );
                  })}
                </div>
                <p className="text-slate-400 font-light leading-relaxed">
                  {review.quote}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-100">
                  — {review.authorName}
                </p>
              </div>
            ))}
          </div>
          <form
            onSubmit={submitReview}
            className="mt-16 max-w-xl mx-auto space-y-4"
          >
            <h3 className="text-sm uppercase tracking-widest text-slate-400 mb-4">
              Add your voice
            </h3>
            <div className="flex items-center gap-2 mb-2 text-primary">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 mr-2">
                Rating
              </span>
              {Array.from({ length: 5 }).map((_, idx) => {
                const isFilled = idx < reviewRating;
                const Icon = isFilled ? StarIcon : StarOutlineIcon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setReviewRating(idx + 1)}
                    className={`transition-all focus:outline-none ${
                      isFilled ? "" : "opacity-30 hover:opacity-70"
                    }`}
                  >
                    <Icon sx={{ fontSize: 20 }} />
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              placeholder="Your name"
              value={reviewAuthor}
              onChange={(e) => setReviewAuthor(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-primary"
            />
            <textarea
              placeholder="Your memory of this scent…"
              value={reviewQuote}
              onChange={(e) => setReviewQuote(e.target.value)}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-primary resize-none"
            />
            <button
              type="submit"
              disabled={
                reviewSubmitting || !reviewAuthor.trim() || !reviewQuote.trim()
              }
              className="px-6 py-3 bg-primary/20 text-primary border border-primary/40 rounded hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-widest"
            >
              {reviewSubmitting ? "Sending…" : "Submit"}
            </button>
          </form>
        </div>
      </section>

      {/* Emotional Closing */}
      <section className="py-40 bg-black flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl space-y-8">
          <h2 className="text-3xl md:text-5xl font-extralight leading-tight tracking-tight text-white italic">
            &quot;When they lean closer…
            <br />
            They’re not just smelling you.
            <br />
            They&apos;re{" "}
            <span className="text-primary not-italic font-medium">
              remembering
            </span>{" "}
            you.&quot;
          </h2>
          <div className="h-px w-32 bg-primary/30 mx-auto" />
        </div>
      </section>

      {/* Discover More Memories */}
      <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">
              The Collection
            </h2>
            <h3 className="text-3xl font-extralight tracking-tight">
              Discover More Memories
            </h3>
          </div>
          <Link
            href="/collection"
            className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-primary transition-colors border-b border-white/10 pb-1"
          >
            View Full Collection
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {otherProducts.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.slug || item.id}`}
              className="group cursor-pointer space-y-6 block"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-background-darker">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="space-y-2 text-center">
                <p className="text-[10px] uppercase tracking-widest text-primary">
                  {item.label}
                </p>
                <h4 className="text-lg font-light tracking-wide">
                  {item.name}
                </h4>
                <span className="inline-block text-[10px] uppercase tracking-[0.2em] border border-white/10 px-6 py-2 rounded group-hover:bg-white group-hover:text-black transition-all">
                  View Product
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
