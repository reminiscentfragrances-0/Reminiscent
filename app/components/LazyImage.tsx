import Image from "next/image";

interface LazyImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
}

export default function LazyImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  width = 1600,
  height = 1600,
}: LazyImageProps) {
  if (!src) {
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="100vw"
      className={className}
      loading={loading}
      fetchPriority={loading === "eager" ? "high" : "low"}
    />
  );
}
