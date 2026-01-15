"use client";

import RemoteImage from "@/components/shared/RemoteImage";
import { useLanguage } from "@/hooks/useLanguage";
import type { Treatment } from "@/types/treatment";

interface TreatMentCardProps {
  treatment: Treatment;
}

export default function TreatMentCard({ treatment }: TreatMentCardProps) {
  const { language } = useLanguage();
  const { photo, name_eng, name_es, title, title_es, description, description_es } = treatment;

  const isEs = language === "es";

  const displayTitle =
    (isEs ? (name_es || title_es) : null) || name_eng || title || name_es || title_es || "";
  const displayDescription = (isEs ? description_es : null) || description || description_es || "";

  // Fallback image if photo is missing
  const imageUrl =
    photo && typeof photo === "string" && photo.length > 0
      ? photo.startsWith("http")
        ? photo
        : `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}${
            photo.startsWith("/") ? "" : "/"
          }${photo}`
      : "/images/hero/hero-1.jpg";

  return (
    <div
      className="flex flex-col items-center rounded-2xl overflow-hidden w-full max-w-[464px] min-h-[400px]"
    >
      <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[464px]">
        <RemoteImage
          src={imageUrl}
          alt={displayTitle || "Treatment"}
          fill
          sizes="(min-width: 1024px) 464px, (min-width: 768px) 340px, (min-width: 640px) 280px, 220px"
          className="rounded-2xl object-cover transition-all"
          quality={100}
        />
      </div>
      <div className="flex flex-col items-center px-2 sm:px-4 pb-4 sm:pb-6 pt-3 sm:pt-4 text-center w-full">
        <h3 className="font-bold text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] leading-[1] text-[#1A1A1A] font-lato mb-2">
          {displayTitle}
        </h3>
        <p className="text-[13px] sm:text-[15px] md:text-[16px] text-[#525252] font-lato font-normal max-w-xs">
          {displayDescription}
        </p>
      </div>
    </div>
  );
}
