export interface JournalPost {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  offset?: boolean;
}

interface JournalProps {
  label?: string;
  title?: string;
  posts?: JournalPost[];
}

import Link from "next/link";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

export default function Journal({
  label = "The Journal",
  title = "Notes from the Laboratory",
  posts = [],
}: JournalProps) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-20 py-32 bg-background-dark">
      {/* Section Header */}
      <div className="text-center mb-20 flex flex-col items-center gap-4">
        <span className="text-xs uppercase tracking-[0.5em] text-parchment/70">
          {label}
        </span>
        <h3 className="text-parchment text-4xl font-light tracking-tight italic font-[family-name:var(--font-serif)]">
          {title}
        </h3>
        <div className="w-24 h-px bg-primary mt-4" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`flex flex-col gap-8 group cursor-pointer ${
              index % 2 !== 0 ? "md:mt-24" : ""
            }`}
          >
            <div className="aspect-video overflow-hidden rounded-xl">
              <div
                className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                style={{ backgroundImage: `url("${post.image}")` }}
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                {post.category}
              </span>
              <h4 className="text-parchment text-2xl font-light group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <p className="text-parchment/70 text-base leading-relaxed">
                {post.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Link to full Journal page */}
      <div className="text-center mt-20">
        <Link
          href="/journal"
          className="inline-flex items-center gap-3 text-parchment/70 hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-[0.4em] font-light">
            Explore the Journal
          </span>
          <ArrowForwardOutlinedIcon
            sx={{
              fontSize: 18,
              transition: "transform 0.2s",
              ".group:hover &": {
                transform: "translateX(4px)",
              },
            }}
          />
        </Link>
      </div>
    </section>
  );
}
