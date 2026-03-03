"use client";

import RemoteImage from "@/components/shared/RemoteImage";
import SectionTitle from "@/components/shared/SectionTitle";
import { useDoctors } from "@/hooks/useDoctors";
import { useLanguage } from "@/hooks/useLanguage";
import type { Doctor } from "@/types/doctor";
import { useMemo, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const FALLBACK_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
  <rect width="100%" height="100%" fill="#EEF2F7"/>
  <circle cx="400" cy="310" r="140" fill="#CBD5E1"/>
  <rect x="180" y="480" width="440" height="220" rx="110" fill="#CBD5E1"/>
</svg>`);

const CARD_SIZE = 302;

function DoctorCard({
  doctor,
  fetchPriority,
  language,
}: {
  doctor: Doctor;
  fetchPriority?: "high" | "low" | "auto";
  language: "en" | "es";
}) {
  const fullName =
    `${doctor.first_name ?? ""} ${doctor.last_name ?? ""}`.trim();
  const title =
    (language === "es" ? doctor.title_es : null) ||
    doctor.title ||
    doctor.title_es;
  const specialties = (doctor.specialties ?? [])
    .map(
      (item) =>
        (language === "es" ? item.name_es : null) || item.name || item.name_es,
    )
    .filter(Boolean);

  const photoUrl = doctor.photo;

  return (
    <div className="shrink-0" style={{ width: CARD_SIZE }}>
      <div
        className="relative overflow-hidden rounded-2xl bg-gray-100"
        style={{ width: CARD_SIZE, height: CARD_SIZE }}
      >
        <RemoteImage
          src={photoUrl ?? FALLBACK_AVATAR}
          fallbackSrc={FALLBACK_AVATAR}
          width={CARD_SIZE}
          height={CARD_SIZE}
          alt={
            `${doctor.first_name ?? ""} ${doctor.last_name ?? ""}`.trim() ||
            "Doctor photo"
          }
          priority={fetchPriority === "high"}
          quality={100}
        />
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-blackColor font-semibold text-[22px] sm:text-[26px] lg:text-[34px] leading-tight min-h-[64px]">
          {fullName || "Doctor"}
        </h3>
        <div className="min-h-[26px]">
          {title ? (
            <p className="text-grayColor text-[16px] sm:text-[18px] lg:text-[20px] leading-tight">
              {title}
            </p>
          ) : null}
        </div>
        <div className="mt-2 min-h-[36px]">
          {specialties.length ? (
            <p className="text-grayColor text-[12px] sm:text-[13px] lg:text-[14px] leading-tight">
              {specialties.map((item, index) => (
                <span key={`${item}-${index}`} className="block">
                  {item}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function MeetTeamSection() {
  const { t, language } = useLanguage();
  const { data, isLoading, isError } = useDoctors();
  const doctors = useMemo(() => (data ?? []) as Doctor[], [data]);
  const [activeIndex, setActiveIndex] = useState(0);

  const hasMany = doctors.length > 1;

  const goPrev = () => {
    if (!doctors.length) return;
    setActiveIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
  };
  const goNext = () => {
    if (!doctors.length) return;
    setActiveIndex((prev) => (prev + 1) % doctors.length);
  };

  if (isLoading) {
    return (
      <section className="bg-background py-12 sm:py-16 lg:py-20 px-4">
        <div className="mx-auto max-w-6xl text-center">
          <div className="text-lg text-grayColor">{t("team.loading")}</div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-background py-12 sm:py-16 lg:py-20 px-4">
        <div className="mx-auto max-w-6xl text-center">
          <div className="text-lg text-grayColor">{t("team.error")}</div>
        </div>
      </section>
    );
  }

  if (!doctors.length) return null;

  return (
    <section className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="page-container">
        <div className="text-center">
          <SectionTitle
            greenText={t("team.title.green")}
            blackText={t("team.title.black")}
            description={t("team.description")}
            titleClassName="text-3xl sm:text-4xl lg:text-[42px] font-semibold"
            descriptionClassName="mx-auto mt-3 max-w-3xl text-sm sm:text-base lg:text-lg text-grayColor"
          />
        </div>

        {/* Mobile/Tablet: manual switch (no auto sliding) */}
        <div className="mt-10 lg:hidden">
          <div className="flex items-center justify-center">
            <DoctorCard
              doctor={doctors[activeIndex]}
              fetchPriority="high"
              language={language}
            />
          </div>

          {hasMany ? (
            <div className="mt-6 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={goPrev}
                className="h-10 w-10 rounded-full flex items-center justify-center text-blackColor"
                aria-label={t("team.prev")}
              >
                <MdKeyboardArrowRight className="text-2xl rotate-180" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="h-10 w-10 rounded-full flex items-center justify-center text-blackColor"
                aria-label={t("team.next")}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </button>
            </div>
          ) : null}
        </div>

        {/* Desktop (lg+): auto right-to-left slide */}
        <div className="mt-10 hidden lg:block">
          <div className="flex gap-20  justify-center items-start">
            {doctors.map((doctor, idx) => (
              <DoctorCard
                key={String(doctor.id)}
                doctor={doctor}
                fetchPriority={idx < 2 ? "high" : "auto"}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
