interface HeroProps {
  title?: string;
  titleAccent?: string;
  description?: string;
  ctaLabel?: string;
  secondaryCtaLabel?: string;
  backgroundImage?: string;
}

export default function Hero({
  title = "Memories Bottled",
  titleAccent = "in Stone and Scent",
  description = "A cinematic collection of sensory recalls and high-end niche essences. Crafted for those who find beauty in the traces left behind.",
  ctaLabel = "Explore Archive",
  secondaryCtaLabel = "The Film",
  backgroundImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDLnWWH9KfQ37TPAF587IrcA0QFSi7VWulqfWRnvulVVeeIO1YXyHzK39Jqa7-nZ-NDN9nc1LC4qGgMFAHIBlIfhqeHv9Tm_hH3RxWhq8UClWz9SBUS7o6eNA8yHa1Dt5Zat22jTJAYDvl0CODO-Uk8I3dt5LuAdi1GBV8I1hyWHoDsR1qh-hzWZVG6VfdJAXVlLmMfxB-OfDYvcanEy0bk1GHM6VCX7wvvQtYtVgT2_rmUc62t0oXkEoMDOblBrG4q18L4hxpM",
}: HeroProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-end overflow-hidden">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-t from-background-dark via-background-dark/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-linear-to-r from-background-dark/60 via-transparent to-transparent z-10" />
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url("${backgroundImage}")` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 px-6 lg:px-40 pb-20 lg:pb-32 max-w-[1400px]">
        <div className="flex flex-col gap-6 max-w-3xl">
          <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] text-glow">
            {title} <br />
            <span className="italic font-light opacity-80">{titleAccent}</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl font-light max-w-xl leading-relaxed">
            {description}
          </p>
          <div className="flex items-center gap-6 mt-4">
            {/* <button className="bg-white text-background-dark px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300">
              {ctaLabel}
            </button>
            <a
              className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase"
              href="#"
            >
              {secondaryCtaLabel}
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                play_circle
              </span>
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}
