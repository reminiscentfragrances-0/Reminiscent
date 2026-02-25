"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { SideNav, Header, Footer } from "../components";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

interface JournalEntry {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  body?: string | null;
  image?: string | null;
  featured: boolean;
  publishedAt: string;
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await fetch("/api/journal");
        if (!res.ok) throw new Error("Failed to fetch journal entries");
        const data = await res.json();
        setEntries(data.entries);
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEntries();
  }, []);

  const filteredEntries = useMemo(() => {
    if (activeCategory === "all") return entries;
    return entries.filter(
      (e) => e.category.toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [entries, activeCategory]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-background-dark min-h-screen">
      <SideNav />
      <Header />

      <main className="relative z-20 px-6 lg:px-40 pt-40 pb-32 max-w-[1400px]">
        {/* Page Heading */}
        <div className="flex flex-col gap-12 mb-20">
          <div className="flex flex-col gap-4">
            <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-6xl text-parchment leading-tight text-glow">
              <span className="italic font-light opacity-80">The Journal</span>
            </h1>
            <p className="text-parchment/40 uppercase tracking-[0.4em] text-[10px] md:text-xs max-w-lg">
              A digital sanctuary for memories, thoughts, and philosophical
              explorations of scent
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-travertine/10 pb-8">
            <div className="flex gap-8 md:gap-12 overflow-x-auto w-full md:w-auto no-scrollbar">
              <button
                onClick={() => setActiveCategory("all")}
                className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] transition-all relative py-2 whitespace-nowrap ${
                  activeCategory === "all"
                    ? "text-primary"
                    : "text-parchment/40 hover:text-parchment"
                }`}
              >
                All Entries
                {activeCategory === "all" && (
                  <span className="absolute bottom-0 left-0 w-full h-px bg-primary animate-in fade-in" />
                )}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] transition-all relative py-2 whitespace-nowrap ${
                    activeCategory === cat
                      ? "text-primary"
                      : "text-parchment/40 hover:text-parchment"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span className="absolute bottom-0 left-0 w-full h-px bg-primary animate-in fade-in" />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4 text-parchment/40 text-[10px] uppercase tracking-[0.2em]">
              <span>
                {loading
                  ? "Loading…"
                  : `Showing ${filteredEntries.length} ${filteredEntries.length === 1 ? "Entry" : "Entries"}`}
              </span>
            </div>
          </div>
        </div>

        {/* Journal Feed */}
        {!loading && (
          <div className="flex flex-col gap-32 max-w-[800px] mx-auto">
            {filteredEntries.map((entry, index) => (
              <Link
                href={`/journal/${entry.slug}`}
                key={entry.id}
                className="group cursor-pointer block"
              >
                <article>
                  <div className="flex flex-col gap-8">
                    {entry.image && (
                      <div className="relative aspect-[21/9] rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-obsidian/30 group-hover:bg-transparent transition-colors duration-700 z-10" />
                        <div
                          className="w-full h-full bg-center bg-cover grayscale-[30%] group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-1000"
                          style={{
                            backgroundImage: `url("${entry.image}")`,
                          }}
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-4">
                      <span className="text-parchment/40 text-[10px] font-light tracking-[0.4em] uppercase">
                        {formatDate(entry.publishedAt)} — {entry.category}
                      </span>
                      <h2 className="text-parchment text-3xl md:text-4xl font-light italic leading-tight font-[family-name:var(--font-serif)] group-hover:text-primary transition-colors duration-300">
                        {entry.title}
                      </h2>
                      <p className="text-parchment/60 text-lg font-light italic leading-relaxed">
                        {entry.description}
                      </p>
                      <div className="pt-4 flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-primary" />
                        <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase hover:tracking-[0.3em] transition-all">
                          Continue Reading
                        </span>
                      </div>
                    </div>
                  </div>
                  {index < filteredEntries.length - 1 && (
                    <div className="flex justify-center mt-16">
                      <div className="w-24 h-[1px] bg-travertine/20" />
                    </div>
                  )}
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="py-40 text-center">
            <p className="text-parchment/20 font-[family-name:var(--font-serif)] italic text-3xl lg:text-5xl animate-pulse">
              Unveiling chapters…
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredEntries.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-parchment/20 font-[family-name:var(--font-serif)] italic text-3xl lg:text-5xl">
              This chapter is yet to be written.
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-12 text-primary text-[10px] font-bold uppercase tracking-[0.5em] border border-primary/20 px-8 py-4 rounded-full hover:bg-primary hover:text-obsidian transition-all"
            >
              View All Entries
            </button>
          </div>
        )}

        {/* Footer Pagination */}
        {!loading && filteredEntries.length > 0 && (
          <div className="mt-32 border-t border-travertine/10 pt-16 text-center max-w-[800px] mx-auto">
            <button
              type="button"
              className="group flex items-center gap-4 mx-auto text-primary"
            >
              <span className="text-xs tracking-[0.4em] uppercase font-light">
                Load Earlier Chapters
              </span>
              <ExpandMoreOutlinedIcon
                sx={{
                  transition: "transform 0.2s",
                  ".group:hover &": {
                    transform: "translateY(4px)",
                  },
                }}
              />
            </button>
          </div>
        )}

        {/* View More Decor */}
        {!loading && filteredEntries.length > 0 && (
          <div className="flex flex-col items-center mt-40">
            <div className="w-[1px] h-32 bg-linear-to-b from-travertine/40 to-transparent" />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
