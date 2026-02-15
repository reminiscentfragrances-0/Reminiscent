export interface ScentNote {
  step: number;
  title: string;
  description: string;
}

interface ScentProfileProps {
  label?: string;
  title?: string;
  notes?: ScentNote[];
  image?: string;
  floatingCard?: {
    title: string;
    description: string;
  };
}

const defaultNotes: ScentNote[] = [
  {
    step: 1,
    title: "Top Notes",
    description:
      "The immediate recall. Fleeting impressions of citrus and ozone that spark the initial recognition.",
  },
  {
    step: 2,
    title: "Heart Notes",
    description:
      "The emotional core. Floral and spice layers that form the narrative center of the fragrance.",
  },
  {
    step: 3,
    title: "Base Notes",
    description:
      "The lasting trace. Deep woods and resins that linger on the skin for hours after the sun sets.",
  },
];

export default function ScentProfile({
  label = "Craftsmanship",
  title = "Architecture of a Memory",
  notes = defaultNotes,
  image = "https://lh3.googleusercontent.com/aida-public/AB6AXuBdlzTpTzad4h-k7u_XHO1Mex5BtIe3aMbeHQ9e-MJT1Wg51mF0xVc1wOOkTXd824TE3ZQyH2pZ8pdBkqs63coqbq3m-JDtS9OjLb_-jU4Cmx_-VzF5Qq1PPJXEt582dT8TIysV6ihitb24YYKevX53vyfCm9QQxOOX7TUDEpIU0XGMjfsDk6tjkjAs_JBB7h0UKL89YL58i5k1yUTsGSN5xnY_MfKmzA4es4-PWItVQ18APCnyISrt7rXmN27kO5WgUtUjx2n6",
  floatingCard = {
    title: "The Stone Cap",
    description:
      "Each cap is hand-carved from volcanic basalt, ensuring no two bottles are ever identical. A tactile reminder of the permanent within the ephemeral.",
  },
}: ScentProfileProps) {
  return (
    <section className="py-24 bg-background-darker">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-40 grid lg:grid-cols-2 gap-16 items-center">
        {/* Image Side */}
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden glass p-4">
            <div
              className="w-full h-full bg-cover bg-center rounded-xl"
              style={{ backgroundImage: `url("${image}")` }}
            />
          </div>

          {/* Floating Info Card */}
          {floatingCard && (
            <div className="absolute -bottom-10 -right-6 glass p-8 rounded-xl max-w-xs hidden md:block">
              <h4 className="font-[family-name:var(--font-serif)] text-xl mb-3">
                {floatingCard.title}
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                {floatingCard.description}
              </p>
            </div>
          )}
        </div>

        {/* Content Side */}
        <div>
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">
            {label}
          </span>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl lg:text-5xl text-white mb-8 leading-tight">
            {title}
          </h2>
          <div className="space-y-8">
            {notes.map((note) => (
              <div key={note.step} className="flex gap-6">
                <div className="h-10 w-10 shrink-0 border border-white/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/40 text-sm">
                    filter_{note.step}
                  </span>
                </div>
                <div>
                  <h5 className="text-white font-bold mb-2 uppercase tracking-wide text-sm">
                    {note.title}
                  </h5>
                  <p className="text-white/50 text-sm">{note.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
