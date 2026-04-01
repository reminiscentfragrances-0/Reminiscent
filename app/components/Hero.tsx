import Image from "next/image";

interface HeroProps {
  title?: string;
  titleAccent?: string;
  description?: string;
  /** Landscape / desktop hero (md and up). */
  backgroundImage?: string;
  /** Portrait / small screens; defaults to mobile crop asset. */
  backgroundImageMobile?: string;
}

const DEFAULT_BG_WEB =
  "https://res.cloudinary.com/dgxyfbgnl/image/upload/v1775072425/Custodians_of_Memories_1440x1080_1_h9e4ke.jpg";
const DEFAULT_BG_MOBILE =
  "https://res.cloudinary.com/dgxyfbgnl/image/upload/v1775073068/Untitled_Design_430x900_1_cng8cr.jpg";

export default function Hero({
  backgroundImage = DEFAULT_BG_WEB,
  backgroundImageMobile = DEFAULT_BG_MOBILE,
}: HeroProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-x-0 bottom-0 h-[38%] z-10 bg-linear-to-t from-obsidian via-obsidian/20 to-transparent md:inset-0 md:h-auto" />
        <div className="absolute inset-0 z-10 hidden md:block bg-linear-to-r from-obsidian/60 via-transparent to-transparent" />
        <div className="relative h-full w-full">
          <Image
            src={backgroundImageMobile}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center hidden md:block"
          />
        </div>
      </div>

    </section>
  );
}
