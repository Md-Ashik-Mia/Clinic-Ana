"use client";

import { useLanguage } from "@/hooks/useLanguage";

interface PageHeaderProps {
	className?: string;
	title?: string;
	description?: string;
	titleKey?: string;
	descriptionKey?: string;
}

export default function PageHeader({
	title,
	description,
	titleKey,
	descriptionKey,
	className = "",
}: PageHeaderProps) {
  const { t } = useLanguage();

  const resolvedTitle = titleKey ? t(titleKey) : (title ?? "");
  const resolvedDescription = descriptionKey ? t(descriptionKey) : (description ?? "");

  return (
    <div className={`flex flex-col items-center text-center ${className}`} style={{ gap: 20 }}>
      <h1
        className="font-bold text-[32px] sm:text-[44px] lg:text-[54px] leading-[1] text-[#003B33] font-lato"
      >
        {resolvedTitle}
      </h1>
      <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#525252] font-lato font-normal max-w-3xl">
        {resolvedDescription}
      </p>
    </div>
  );
}
