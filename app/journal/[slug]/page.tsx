import { notFound } from "next/navigation";
import { SideNav, Header, Footer } from "@/app/components";
import { getJournalEntryBySlug } from "@/lib/db-journal";
import Link from "next/link";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function JournalPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const entry = await getJournalEntryBySlug(resolvedParams.slug);

  if (!entry) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-background-dark min-h-screen">
      <SideNav />
      <Header />

      <main className="relative z-20 px-6 lg:px-40 pt-40 pb-32 max-w-[800px] mx-auto">
        {/* Back Link */}
        <div className="mb-20">
          <Link
            href="/journal"
            className="inline-flex items-center gap-3 text-parchment/40 hover:text-primary transition-colors group"
          >
            <ArrowBackOutlinedIcon
              sx={{
                fontSize: 18,
                transition: "transform 0.2s",
                ".group:hover &": {
                  transform: "translateX(-4px)",
                },
              }}
            />
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium">
              Return to Journal
            </span>
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-8 mb-16">
          <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-bold">
            {formatDate(entry.publishedAt)} — {entry.category}
          </span>
          <h1 className="text-5xl md:text-6xl text-parchment font-[family-name:var(--font-serif)] italic leading-tight text-glow">
            {entry.title}
          </h1>
          <p className="text-parchment/60 text-lg leading-relaxed italic">
            {entry.description}
          </p>
        </div>

        {/* Hero Image */}
        {entry.image && (
          <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-20">
            <div className="absolute inset-0 bg-obsidian/20" />
            <div
              className="w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url("${entry.image}")` }}
            />
          </div>
        )}

        {/* Body Content */}
        <article className="text-parchment/70 text-base md:text-lg leading-loose space-y-8 font-light tracking-wide">
          {entry.body?.split("\n\n").map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

        {/* End Decorator */}
        <div className="flex flex-col items-center mt-32 mb-16">
          <div className="w-[1px] h-24 bg-linear-to-b from-travertine/40 to-transparent" />
          <div className="mt-8 text-primary text-[10px] uppercase tracking-[0.8em]">
            End of Chapter
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
