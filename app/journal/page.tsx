import Link from "next/link";
import { SideNav, Header, Footer } from "../components";

const filterTabs = [
  { label: "All Entries", active: true },
  { label: "Olfactory Poetry", active: false },
  { label: "Fragrant Memories", active: false },
  { label: "Philosophical Musings", active: false },
];

const journalEntries = [
  {
    category: "October 14, 2023 — Olfactory Poetry",
    title: "The Ghost of a Rose",
    description:
      "In the quiet corners of a forgotten garden, the scent of crushed petals evokes a childhood long passed, where time stood still under the weight of summer dew. It is not the rose itself we remember, but the hollow space it left in the air after the harvest.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbyLWiDYyYF5gVzjawBmNVsumPFWBkaM1T7QNZFWYH9yfx5bsN70EulMtU7nXJ33FQIlXcbbdAbvm5MI8Mv8CX3s3cp8-s0BG9wIJN9b6I0qcU9DDaJ2YANpCsvoD3DUgR0OPhbgtTDGL_BfDtEi3W35JZV76I6aRBk0tX4OvLdAG_4BEW9-Ut0vaoq81DqSmsrc4HOSjC23m6ldajfyrusuCY-FPXKxILYhwdfV8y0mPeqPrwMgpZsckqsQOu88AMHaYvqsCouiqn",
  },
  {
    category: "September 28, 2023 — Philosophical Musings",
    title: "Scent as a Vessel for Time",
    description:
      "How does a single molecule carry the weight of a decade? Exploring the architecture of memory through the lens of niche perfumery. We are all archives of invisible maps, guided by the phantom limbs of aromas we once knew.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpobVXBb5hdHMnNNiyxqEj1NKh6gkedeu0ngvW6USSQum4pq6_d6_r_7mKM5hdcqoNazdKqHm6EeVeQSEz37RLS7fFm861K6TFUrUhk47WadOsmOabLHRdPfdyPS9z23dRmnz8sUR26bOf9-qs50wakWu72I9UA1xyMtCmVzbRLQqx4K1jp6sQmrG1TCW2Xj2EFwGbU-lGAXFsR5rIsL2Py_-4wmDMSjJGFjuXOoiBnujH3pJVxcZLPnN2g-Vsmdii4jI4wKLGlClH",
  },
  {
    category: "September 12, 2023 — Fragrant Memories",
    title: "The Anatomy of Melancholy",
    description:
      "Rain-slicked pavement and the iron-rich scent of impending storms. Why does the smell of earth before rain feel like a homecoming? In the heart of the storm, we find the notes that compose our most silent griefs.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnY4uNVP69syLBeXGINeKsopEWTBGFlnJOrrIKM91zUmiI5As99PT91u0WNwdxVmesGWlBvmfb-tHcX2YLmbSAYtBJYRYcfW7i167aPd9_4WkAptVEP8ykP0oYHs315sWYC6JhWExb195HCxAUDkN4lPw3_et2yUV-TDWzJKPusvolgh4BWtDzDV1SBqOdtEFhDowTkGopsjBrUsM6pZbqUGnkAaWDkH1B0ZvM4J4-oNXW_MiOon4pciHb0QvI8JWBgJ0sjCnWAl-J",
  },
];

export default function PhilosophyPage() {
  return (
    <>
      <SideNav />
      <Header />
      <main className="relative flex-1 min-h-screen pt-28 pb-20">
        <div className="max-w-[800px] mx-auto px-6 py-12 md:py-24">
          {/* Page Heading */}
          <div className="flex flex-col gap-6 mb-20 text-center">
            <h1 className="text-parchment text-5xl md:text-7xl font-extralight italic tracking-tight leading-[1.1] font-[family-name:var(--font-serif)]">
              The Journal
            </h1>
            <p className="text-parchment/70 text-lg font-light max-w-xl mx-auto italic">
              A digital sanctuary for memories, thoughts, and philosophical
              explorations of scent. A space where time dissolves into ether.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mb-16">
            <div className="flex border-b border-travertine/30 justify-center gap-12 flex-wrap">
              {filterTabs.map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  className={`flex flex-col items-center justify-center border-b-2 pb-4 ${
                    tab.active
                      ? "border-primary text-primary"
                      : "border-transparent text-parchment/60 hover:text-primary transition-colors"
                  }`}
                >
                  <span className="text-xs font-medium tracking-[0.3em] uppercase">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Journal Feed */}
          <div className="flex flex-col gap-32">
            {journalEntries.map((entry, index) => (
              <article key={entry.title} className="group cursor-pointer">
                <div className="flex flex-col gap-8">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[21/9] bg-cover rounded-sm grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                    style={{ backgroundImage: `url("${entry.image}")` }}
                    role="img"
                    aria-label={entry.title}
                  />
                  <div className="flex flex-col gap-4">
                    <span className="text-parchment/60 text-xs font-light tracking-[0.4em] uppercase">
                      {entry.category}
                    </span>
                    <h2 className="text-parchment text-3xl md:text-4xl font-light italic leading-tight font-[family-name:var(--font-serif)]">
                      {entry.title}
                    </h2>
                    <p className="text-parchment/70 text-lg font-light italic">
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
                {index < journalEntries.length - 1 && (
                  <div className="flex justify-center mt-16">
                    <div className="w-24 h-[1px] bg-travertine/40" />
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Footer / Pagination */}
          <div className="mt-32 border-t border-travertine/30 pt-16 text-center">
            <button
              type="button"
              className="group flex items-center gap-4 mx-auto text-primary"
            >
              <span className="text-xs tracking-[0.4em] uppercase font-light">
                Load Earlier Chapters
              </span>
              <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">
                expand_more
              </span>
            </button>
            <div className="mt-24 mb-12 text-parchment/50 text-[10px] tracking-[0.5em] uppercase">
              © The Reminiscent Journal — MMXXIV
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
