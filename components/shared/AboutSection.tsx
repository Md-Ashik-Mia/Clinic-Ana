"use client";

import RemoteImage from "@/components/shared/RemoteImage";
import { useLanguage } from "@/hooks/useLanguage";

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
  <rect width="100%" height="100%" fill="#EEF2F7"/>
  <rect x="120" y="160" width="560" height="480" rx="24" fill="#CBD5E1"/>
</svg>`);


interface AboutSectionProps {
	title?: string;
	highlight?: string;
	description?: string;
	titleKey?: string;
	highlightKey?: string;
	descriptionKey?: string;
	highlightColor?: string;
	image: string;
	imageAlt?: string;
	reverse?: boolean;
}

export default function AboutSection({
	title,
	highlight,
	description,
	titleKey,
	highlightKey,
	descriptionKey,
	highlightColor = "#00A991",
	image,
	imageAlt = "About section image",
	reverse = false,
}: AboutSectionProps) {
  const { t } = useLanguage();

  const resolvedTitle = titleKey ? t(titleKey) : (title ?? "");
  const resolvedHighlight = highlightKey ? t(highlightKey) : highlight;
  const resolvedDescription = descriptionKey ? t(descriptionKey) : (description ?? "");

  return (
    <section
      className={`w-full flex flex-col-reverse ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-between gap-8 md:gap-12 lg:gap-[19px] mb-12 lg:mb-16`}
    >
      {/* Text */}
      <div className="flex-1 min-w-0 max-w-full lg:max-w-[530px] text-left px-1 sm:px-4 md:px-0">
        <h2 className="font-bold font-lato text-[2rem] sm:text-[2.5rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.1] mb-2">
            {resolvedHighlight && (
              <span style={{ color: highlightColor }}>{resolvedHighlight} </span>
            )}
          {resolvedTitle}
        </h2>
        <p className="text-[1.1rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] text-[#525252] font-lato font-normal mt-2">
          {resolvedDescription}
        </p>
      </div>
      {/* Image */}
      <div className="flex-1 flex items-center justify-center w-full max-w-full">
        <div className="relative w-full aspect-square max-w-[350px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[730px]">
          <RemoteImage
            src={image}
            fallbackSrc={FALLBACK_IMAGE}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 730px, (min-width: 768px) 600px, (min-width: 640px) 450px, 350px"
            className="rounded-[20px]"
            quality={100}
          />
        </div>
      </div>
    </section>
  );
}
