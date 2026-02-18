import Link from "next/link";
import { SideNav, Header, Footer } from "../components";

const categories = [
  { id: "all", label: "All Memories", active: true },
  { id: "earthy", label: "Earthy & Rooted", active: false },
  { id: "floral", label: "Floral Whispers", active: false },
  { id: "oceanic", label: "Oceanic Depths", active: false },
];

const galleryItems = [
  {
    name: "Morning at the Library",
    description:
      "Dust motes dancing in sunbeams, old parchment, and the quiet promise of an unread story.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXdoMjcZACZWWIX6cdgfkHBaX-mT7wP3_8-MVukQns0eYBPq0XbIgjwRdREwV0u5X3Z8ZBeasd0dMHw1fXfRf6OkOSpDlL7rpMbkY5Us2_VhfuTokwqDSUeMlmzcNKYlGF__wXNgKzDDxP9RsDycDyYSsexbrwCHfXZprce5ObBtjcT930qcZ5L6RVXWZqdLLz2Kc4pMX9gX7u16ITZXcmHLyV8eUyiuxsHQ8hFlryv19S1rh0Z5wMr4sF8C6423mdIQqUh1eF3ZcO",
  },
  {
    name: "Rain on the Shore",
    description:
      "Cold salt spray, crushed lavender, and the melancholic beauty of a storm-swept coast.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCp0Q-cClZ4fzeNPt46jRgLbuVDFhL9L70DnP7OLPKnP8CcRYl3F2WucDytCaO1E4BS8DTxcXGTSegPG0L4FNkdh4EpEYZf1mNCX1LGkKQNhLUNEbVlIcS12qc7tA0mkVQln4ePi4caMHGbtl4zAEzIQUFq7E0UJ5LzabeUSLmFuAxTkc5OIBRmzggrJJS9EcYxgxQkd9mMxvhVyTeQSEoqtM8EwkXpGs9R1q3AY-Y1FXQnW1g60gx97T8AAuNbK-PcYraJRwy3DB1Z",
  },
  {
    name: "Velvet Dusk",
    description:
      "The scent of midnight blossoms and the lingering warmth of a fire dying in the grate.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAeawYX5QXNLTDqWeV26jknujWx8VjI7LKhMgRpMPs6VDkgJvGOtsqWPqNljAtmI-DT7NB94x16CLsS7I-RKHZsXXzSbAmec7sbPd6LEFjlz0UW_4gk1-jIhrXAIrNnwYBbC3et88lbt19V-SXwvh6CNRj_w11rxe7llAUrH4Ql8mRMN-J31uTOfwKWDAlT79jKMkV65_jcXsZW8S6EPRgWDCCGyCrFe7boy_eGohuvCl4UcwhS7n4DrbuRlDS8cER_CkaQNHcekvZH",
  },
  {
    name: "Winter Orchard",
    description:
      "Crisp frost on fallen apples, cedar wood, and the silence of a snow-covered valley.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRfffoyp4RGUoi9LDbqf6EmR2YfA6IrnIFt8EfRA1Lrb1zPFt5XteHXQAps1rgRxh8enotGklhwIaXUDjFUsSmpTRTTymtmxHRv454ETfjuZvb4Gzb3IHZocsgGW5iqG1il7ZZ6-XVfqopxPC7LieGRbL7VLqmYdqA3Bc5xUZ8NNXVRvQe982HRr06JEHe_Tziof78jYoHuOOj3WxHJzyfbIbCViYueDUtNcwXjerI68hFhIUOUUalNlD3x0jFYNq63oofHHOabtQb",
  },
  {
    name: "Antique Silk",
    description:
      "Powdery iris, worn leather gloves, and the scent of a hidden jewelry box.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-L8Sn74lZUGQvExYbwRg4fv5WcNUueSNmhiYQTIAu0b-j4VRA7wGovHnM_9eF-sHDnJvVJuYtx14KG_HJcINKryo4J6hq7NT1gvAMVcjt9qzG4tg5XDObN_veTFMS2zN92jdzgas_eyRXg9tt9f9AmrEbr5taiIiK5snQLhlvqyI4HmK28AMgzk5Q4AJt3QyZZVTDOVjBHbjW8qc8h1wPE6ipD2qC1f8rsbRnXzDDcnAEOd8Fjj8OJ-3VWtsznSenL6QpeuPZkgYd",
  },
  {
    name: "Sun-Drenched Patio",
    description:
      "Warm terracotta, citrus zest, and the vibrant hum of a Mediterranean afternoon.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1QooSvUAofmeRltjuPFj3nnb6aDT72nM0G301ZiwlLwQ7xPySgX1ac7q0RqWafTAlUa0sDgHdgK51C3JKQ2rvhA9oCfTri44QT9WlIN5tZmcR78bZTs4w7yJTz6gsGcCX7AnhEUM0OJTxvhqHdZpZrEbjhRsRdHZNj-l0iCNylV9fp8HFyY2JuylCZYOSF9Yt4DBJNKKZnrPEb2plqSf7DL3F-rHGGXsRsn0XE52xsbPtBIMwydglFZFHXgP-0pTHgn2V1nWOpi-Q",
  },
];

export default function CollectionPage() {
  return (
    <>
      <SideNav />
      <Header />
      <main className="relative flex-1 px-6 md:px-12 lg:px-24 pt-28 pb-20 max-w-[1400px] mx-auto w-full">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 py-4">
          <Link
            href="/"
            className="text-white/40 text-xs uppercase tracking-widest font-medium hover:text-primary transition-colors"
          >
            Archives
          </Link>
          <span className="text-white/40 text-xs">/</span>
          <span className="text-white text-xs uppercase tracking-widest font-bold">
            Fragrances
          </span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl italic leading-tight tracking-tight">
              The Fragrance Gallery
            </h1>
            <p className="text-white/60 text-base md:text-lg font-light leading-relaxed mt-4 max-w-lg">
              A curated sanctuary of sensory memories preserved in glass. Each
              scent is a vessel for a moment once lived, now immortalized.
            </p>
          </div>
        </div>

        {/* Tabs & Filter */}
        <div className="flex flex-col md:flex-row border-b border-white/10 justify-between items-center mb-12 gap-4">
          <div className="flex gap-6 md:gap-12 overflow-x-auto w-full md:w-auto no-scrollbar pb-px">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.active ? "#" : "#"}
                className={`flex flex-col items-center border-b-2 pb-4 pt-4 whitespace-nowrap transition-colors ${
                  cat.active
                    ? "border-primary text-white"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-widest">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest pb-4 md:pb-0">
            <span>Filter By Era</span>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              expand_more
            </span>
          </div>
        </div>

        {/* Product Gallery Grid */}
        <div
          className="grid gap-12 md:gap-16"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {galleryItems.map((item) => (
            <article
              key={item.name}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[3/4] bg-white/5 overflow-hidden mb-6 relative rounded-lg">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10" />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <h3 className="font-serif text-white text-2xl mb-2 group-hover:text-primary transition-colors">
                {item.name}
              </h3>
              <p className="text-white/50 text-sm italic mb-6 font-light">
                {item.description}
              </p>
              <Link
                href="/checkout"
                className="block w-full py-4 text-center border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary hover:border-primary hover:text-white transition-colors rounded-lg"
              >
                Discover
              </Link>
            </article>
          ))}
        </div>

        {/* View More */}
        <div className="flex flex-col items-center mt-24 mb-12">
          <div className="w-px h-24 bg-white/10 mb-8" />
          <button
            type="button"
            className="text-white text-xs font-bold uppercase tracking-[0.4em] hover:text-primary transition-colors"
          >
            View More Archives
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
