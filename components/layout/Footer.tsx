/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

import { useClinicInfo } from "@/hooks/useClinicInfo";
import { useLanguage } from "@/hooks/useLanguage";
import { useTreatments } from "@/hooks/useTreatments";
import { useWorkingHours } from "@/hooks/useWorkingHours";

type WorkingHour = {
  id: number | string;
  slots?: Array<{
    id: number | string;
    start_time?: string | null;
    end_time?: string | null;
    time_slots?: number | null;
  }>;
  days?: string | null;
  days_es?: string | null;
  closed_days?: string | null;
  closed_days_es?: string | null;
};

function formatTimeForDisplay(time: string | null | undefined): string {
  if (!time || typeof time !== "string") return "";
  const [hhRaw, mmRaw] = time.split(":");
  const hours24 = parseInt(hhRaw ?? "0", 10);
  const minutes = String(parseInt(mmRaw ?? "0", 10)).padStart(2, "0");
  const suffix = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${minutes} ${suffix}`;
}

function normalizeDayLabel(
  days: string | null | undefined,
  daysEs: string | null | undefined,
  closedDays: string | null | undefined,
  closedDaysEs: string | null | undefined,
  language: "en" | "es",
  noDaysText: string,
): string {
  const rawLabel =
    language === "es" ? daysEs || closedDaysEs || "" : days || closedDays || "";
  const label = rawLabel.trim();
  if (!label) return noDaysText;

  const mapEn: Record<string, string> = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  const mapEs: Record<string, string> = {
    Monday: "Lun",
    Tuesday: "Mar",
    Wednesday: "Mié",
    Thursday: "Jue",
    Friday: "Vie",
    Saturday: "Sáb",
    Sunday: "Dom",
  };

  const map = language === "es" ? mapEs : mapEn;

  const rangeMatch = label.match(/^([A-Za-z]+)\s*-\s*([A-Za-z]+)$/);
  if (rangeMatch) {
    const fromKey = rangeMatch[1];
    const toKey = rangeMatch[2];
    const from = map[fromKey] ?? fromKey;
    const to = map[toKey] ?? toKey;
    return `${from}-${to}`;
  }

  return map[label] ?? label;
}

export default function Footer() {
  const { data: clinicInfo } = useClinicInfo();
  const { data: workingHours } = useWorkingHours();
  const { data: treatments } = useTreatments();
  const { language, t } = useLanguage();

  const primaryEmail = clinicInfo?.emails?.[0] ?? "";
  const primaryPhone = clinicInfo?.phone_numbers?.[0] ?? "";
  const location = clinicInfo?.location ?? "";

  const socials = [
    {
      key: "instagram",
      href: clinicInfo?.instagram_link,
      icon: <FaInstagram className="h-6 w-6" />,
      label: "Instagram",
    },
    {
      key: "facebook",
      href: clinicInfo?.facebook_link,
      icon: <FaFacebookF className="h-6 w-6" />,
      label: "Facebook",
    },
    {
      key: "youtube",
      href: undefined,
      icon: <FaYoutube className="h-6 w-6" />,
      label: "YouTube",
    },
    {
      key: "linkedin",
      href: clinicInfo?.linkedin_link,
      icon: <FaLinkedinIn className="h-6 w-6" />,
      label: "LinkedIn",
    },
  ];

  const items = (workingHours ?? []) as WorkingHour[];
  const timeItems = items.slice(0, 4).map((item) => {
    const label = normalizeDayLabel(
      item?.days,
      item?.days_es,
      item?.closed_days,
      item?.closed_days_es,
      language,
      t("footer.noDays"),
    );
    const slots = (item?.slots ?? []).filter(
      (slot) => slot?.start_time && slot?.end_time,
    );
    const isClosed =
      Boolean(item?.closed_days || item?.closed_days_es) || slots.length === 0;
    return { id: item.id, label, slots, isClosed };
  });

  const serviceItems = (treatments ?? [])
    .map(
      (item) =>
        (language === "es" ? item?.name_es || item?.title_es : null) ||
        item?.name_eng ||
        item?.title ||
        item?.name_es ||
        item?.title_es ||
        "",
    )
    .filter(Boolean)
    .slice(0, 7);

  return (
    <footer className="bg-[#E6F6F4] py-12">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr] gap-10 lg:gap-14">
          {/* Left */}
          <div>
            <img
              src="/images/logo/logo.png"
              alt="Clinic logo"
              className="h-23 w-auto"
            />
            <p className="mt-4 max-w-81.5 text-[16px] leading-tight text-[#003B33]">
              {t("footer.about")}
            </p>

            <div className="mt-6 flex items-center gap-4 text-black">
              {socials
                .filter((s) => Boolean(s.href))
                .map((s) => (
                  <a
                    key={s.key}
                    href={s.href as string}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="icon-interactive inline-flex h-6 w-6 items-center justify-center"
                  >
                    {s.icon}
                  </a>
                ))}
            </div>

            <div className="mt-7 space-y-3 text-blackColor">
              <div className="flex items-start gap-3">
                <MdLocationOn className="mt-0.5 h-5 w-5 text-grayColor" />
                <span className="text-[18px] leading-none">
                  {location || "-"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className="h-5 w-5 text-grayColor" />
                <span className="text-[18px] leading-none">
                  {primaryPhone || "-"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MdEmail className="h-5 w-5 text-grayColor" />
                <span className="text-[18px] leading-none">
                  {primaryEmail || "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[22px] font-medium leading-none text-blackColor">
              {t("footer.quickLinks")}
            </h4>
            <ul className="mt-5 space-y-3">
              {[
                { label: t("nav.home"), href: "/" },
                { label: t("nav.about"), href: "/about" },
                { label: t("nav.services"), href: "/services" },
                { label: t("nav.testimonials"), href: "/testimonials" },
                { label: t("nav.contact"), href: "/contact" },
              ].map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="text-[18px] text-grayColor underline underline-offset-4"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="text-[22px] font-medium leading-none text-blackColor">
              {t("footer.service")}
            </h4>
            <ul className="mt-5 space-y-3 text-[18px] text-grayColor">
              {serviceItems.length ? (
                serviceItems.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))
              ) : (
                <li>-</li>
              )}
            </ul>
          </div>

          {/* Time */}
          <div>
            <h4 className="text-[22px] font-medium leading-none text-blackColor">
              {t("footer.time")}
            </h4>
            <ul className="mt-5 space-y-3 text-[18px] text-grayColor">
              {timeItems.length ? (
                timeItems.map((item) => (
                  <li key={String(item.id)}>
                    <div>{item.label}</div>
                    {item.isClosed ? (
                      <div className="mt-1 text-sm text-grayColor">
                        {t("footer.closed")}
                      </div>
                    ) : (
                      <div className="mt-1 space-y-1 text-sm text-grayColor">
                        {item.slots.map((slot) => {
                          const start = formatTimeForDisplay(slot?.start_time);
                          const end = formatTimeForDisplay(slot?.end_time);
                          return (
                            <div key={String(slot.id)}>
                              ({start} - {end})
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <li>-</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-blackColor text-sm">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
