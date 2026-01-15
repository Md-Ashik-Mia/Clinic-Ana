"use client";

import Image, { type ImageProps } from "next/image";

type RemoteImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
};

function normalizeImageUrl(raw?: string | null) {
  const s = (raw ?? "").trim();
  if (!s) return null;

  if (s.startsWith("data:")) return s;

  if (s.startsWith("//")) {
    if (typeof window !== "undefined") {
      return `${window.location.protocol}${s}`;
    }
    return `https:${s}`;
  }

  if (s.startsWith("/")) {
    const base = process.env.NEXT_PUBLIC_API_URL;
    if (base) {
      try {
        const joined = new URL(s.replace(/^\/+/, ""), base.endsWith("/") ? base : `${base}/`);
        joined.pathname = joined.pathname.replace(/\/{2,}/g, "/");
        return joined.toString();
      } catch {
        return s.replace(/\/{2,}/g, "/");
      }
    }

    return s.replace(/\/{2,}/g, "/");
  }

  try {
    const u = new URL(s);
    u.pathname = u.pathname.replace(/\/{2,}/g, "/");
    return u.toString();
  } catch {
    return s.replace(/\/{2,}/g, "/");
  }
}

export default function RemoteImage({ src, fallbackSrc, unoptimized, alt, ...props }: RemoteImageProps) {
  const normalized = normalizeImageUrl(src) || fallbackSrc || "";
  if (!normalized) return null;

  const isData = normalized.startsWith("data:");
  const isLocal = normalized.startsWith("/");
  const imageSrc = isData || isLocal ? normalized : `/api/image?url=${encodeURIComponent(normalized)}`;

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      unoptimized={isData || unoptimized}
    />
  );
}
