interface PhilosophyProps {
  label?: string;
  quote?: string;
}

export default function Philosophy({
  label = "The Philosophy",
  quote = '"At Reminiscent Fragrances, we believe that scent is the most intimate form of memory. It is a time machine that can transport you back to a single moment, a specific place, or a forgotten emotion."',
}: PhilosophyProps) {
  return (
    <section className="py-24 bg-parchment">
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="text-primary text-sm font-bold tracking-[0.3em] uppercase text-center mb-10">
          {label}
        </h2>
        <p className="text-ink text-2xl md:text-3xl font-light leading-relaxed text-center italic">
          {quote}
        </p>
        <div className="flex justify-center mt-12">
          <div className="size-1 bg-primary rounded-full mx-2" />
          <div className="size-1 bg-accent rounded-full mx-2" />
          <div className="size-1 bg-primary/20 rounded-full mx-2" />
        </div>
      </div>
    </section>
  );
}
