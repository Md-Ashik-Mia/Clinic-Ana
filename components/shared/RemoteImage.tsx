"use client";

import { type ImageProps } from "next/image";

type RemoteImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
  objectFit?: React.CSSProperties["objectFit"];
};

function normalizeImageUrl(raw?: string | null) {
  const s = (raw ?? "").trim();
  if (!s) return null;

  // Data URLs are returned as-is
  if (s.startsWith("data:")) return s;

  // Protocol-relative URLs
  if (s.startsWith("//")) {
    if (typeof window !== "undefined") {
      return `${window.location.protocol}${s}`;
    }
    return `https:${s}`;
  }

  // Absolute URLs are returned as-is (but normalized for double slashes in path)
  if (s.startsWith("http://") || s.startsWith("https://")) {
    try {
      const u = new URL(s);
      u.pathname = u.pathname.replace(/\/{2,}/g, "/");
      return u.toString();
    } catch {
      return s.replace(/\/{2,}/g, "/");
    }
  }

  // Relative paths (starting with / or not)
  const base = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  try {
    // We want to use the origin of the API URL for media files,
    // especially if NEXT_PUBLIC_API_URL includes a path like /api/v1/
    const baseUrl = new URL(base);
    const origin = baseUrl.origin;

    // Join origin with the path, ensuring a single leading slash for the path
    const path = s.startsWith("/") ? s : `/${s}`;
    const normalizedPath = path.replace(/\/{2,}/g, "/");

    return `${origin}${normalizedPath}`;
  } catch {
    // Fallback if base is not a valid URL
    const path = s.startsWith("/") ? s : `/${s}`;
    return `${base}${path}`.replace(/(https?:\/\/)|(\/)+/g, "$1$2");
  }
}

export default function RemoteImage({
  src,
  fallbackSrc,
  alt,
  fill,
  priority,
  quality,
  loading,
  objectFit = "fill",
  ...props
}: RemoteImageProps) {
  const normalized = normalizeImageUrl(src) || fallbackSrc || "";

  if (!normalized) return null;

  // Handle 'fill' manually for standard img tag
  const imgStyle: React.CSSProperties = fill
    ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      }
    : {};

  return (
    <img
      src={normalized}
      alt={alt}
      loading={loading || (priority ? "eager" : "lazy")}
      {...(props as any)}
      style={{
        objectFit, // Defaults to 'cover' to prevent stretching
        display: "block",
        ...imgStyle,
        ...props.style
      }}
    />
  );
}
