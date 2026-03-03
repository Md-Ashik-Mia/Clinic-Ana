"use client";

import RemoteImage from "@/components/shared/RemoteImage";
import { useLanguage } from "@/hooks/useLanguage";
import type { Treatment } from "@/types/treatment";

interface TreatMentCardProps {
  treatment: Treatment;
}

export default function TreatMentCard({ treatment }: TreatMentCardProps) {
  const { language } = useLanguage();
  const {
    photo,
    name_eng,
    name_es,
    title,
    title_es,
    description,
    description_es,
  } = treatment;

  const isEs = language === "es";

  const displayTitle =
    (isEs ? name_es || title_es : null) ||
    name_eng ||
    title ||
    name_es ||
    title_es ||
    "";
  const displayDescription =
    (isEs ? description_es : null) || description || description_es || "";

  // Pass the photo directly to RemoteImage, which handles base URL normalization
  const imageUrl =
    photo && typeof photo === "string" && photo.length > 0
      ? photo
      : "/images/hero/hero-1.jpg";

  return (
    <div className="flex flex-col items-center rounded-2xl overflow-hidden w-full max-w-[464px] min-h-[400px]">
      <div className="relative w-full aspect-square">
        <RemoteImage
          src={imageUrl}
          alt={displayTitle || "Treatment"}
          fill
          sizes="(min-width: 1024px) 464px, (min-width: 768px) 340px, (min-width: 640px) 280px, 220px"
          className="rounded-2xl transition-all"
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
