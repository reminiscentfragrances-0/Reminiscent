import Link from "next/link";

interface HeaderProps {
  brandName?: string;
  tagline?: string;
}

export default function Header({
  brandName = "Reminiscent",
  tagline = "Niche Fragrance House",
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-40 p-6 flex justify-between items-center lg:px-12">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
          <span
            className="material-symbols-outlined text-white"
            style={{ fontSize: 20 }}
          >
            diamond
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-white text-base font-bold tracking-widest uppercase">
            {brandName}
          </span>
          <span className="text-white/50 text-[10px] uppercase tracking-[0.2em]">
            {tagline}
          </span>
        </div>
      </Link>
    </header>
  );
}
