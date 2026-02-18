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

const defaultPosts: JournalPost[] = [
  {
    id: "frankincense",
    category: "Raw Materials",
    title: "The Sourcing of Somalian Frankincense",
    description:
      "An exploration into the high-altitude resins that form the backbone of our 'Ancient Ink' collection.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDDCKWGyN8CQAbaKPA_4QBMwXq0X5OVo81sxVTBL_w2Glsxwj3UIpX2fw0UW6DyXtsF-BUjMyQiy9f-729MNLnsNx6nznwPcCMqtPml5Gc1od6OxlFTqxhs_mbqyJlCbANu5lAA4GsUmRB9rW8vWTJGrMQNnP-5K9Yh2Z8aGkeqbMwlUfQ9zOhKPlclhCGKpzzJysULEJRG8ZrblOFazdIwxY6GzcA4h8v7eJV1WuKa_6gx7rhP0WaRrkouNBjOMkYwTX9gVVpY",
  },
  {
    id: "travertine",
    category: "Architecture",
    title: "Form and Function: The Travertine Cap",
    description:
      "Why we chose the porous, architectural nature of travertine stone as our signature tactile element.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAs-dpLDysJF_yfd2KlOw5rul5KT1WFFcxEGS0zWHMYHL-wELMHbcR1xggMuGA3ALJrCc1nnY6I_WtAVnr6828r3eKiV12QA1-vNONpi67CyxeeMFTv8ClUqBY6oRj9JM4vHbfGPnitsGM_Gbz49Sc00wIkD7tnxkKvkMa6RJQbskH7JN2aKR6scmr8h4tqDdf-xWkxZv2cCyPTNXyBrEtSTPWEsDVbv-VC27TNExE4CGCpGVusqCw93t_9ptBGvpHW_pakvNQq",
    offset: true,
  },
];

import Link from "next/link";

export default function Journal({
  label = "The Journal",
  title = "Notes from the Laboratory",
  posts = defaultPosts,
}: JournalProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-20 py-32 bg-background-dark">
      {/* Section Header */}
      <div className="text-center mb-20 flex flex-col items-center gap-4">
        <span className="text-xs uppercase tracking-[0.5em] text-white/60">
          {label}
        </span>
        <h3 className="text-white text-4xl font-light tracking-tight italic font-[family-name:var(--font-serif)]">
          {title}
        </h3>
        <div className="w-24 h-px bg-primary mt-4" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`flex flex-col gap-8 group cursor-pointer ${
              post.offset ? "md:mt-24" : ""
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
              <h4 className="text-white text-2xl font-light group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <p className="text-white/60 text-base leading-relaxed">
                {post.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Link to full Philosophy / Journal page */}
      <div className="text-center mt-20">
        <Link
          href="/philosophy"
          className="inline-flex items-center gap-3 text-white/60 hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-[0.4em] font-light">
            Explore the Journal
          </span>
          <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </section>
  );
}
