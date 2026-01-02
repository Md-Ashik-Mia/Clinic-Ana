'use client';

import { useClinicInfo } from '@/hooks/useClinicInfo';
import { useLanguage } from '@/hooks/useLanguage';
import { useWorkingHours } from '@/hooks/useWorkingHours';
import type { ReactNode } from 'react';
import { FiClock } from 'react-icons/fi';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

type WorkingHour = {
  id: number | string;
  start_time?: string | null;
  end_time?: string | null;
  days?: string | null;
  closed_days?: string | null;
};

function formatTimeForDisplay(time: string | null | undefined, separator: ':' | '.'): string {
  if (!time || typeof time !== 'string') return '';
  const [hhRaw, mmRaw] = time.split(':');
  const hours = String(parseInt(hhRaw ?? '0', 10));
  const minutes = String(parseInt(mmRaw ?? '0', 10)).padStart(2, '0');
  return `${hours}${separator}${minutes}`;
}

function normalizeDayLabel(days: string | null | undefined, closedDays: string | null | undefined): string {
  const label = (days || closedDays || '').trim();
  if (!label) return 'No specific days';

  const map: Record<string, string> = {
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
    Sunday: 'Sun',
  };

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

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="h-14 w-14 rounded-full bg-[#B0E4DD] flex items-center justify-center text-[#006557]">
        {icon}
      </div>
      <div className="mt-3 text-[18px] font-semibold text-[#003B33]">{title}</div>
      <div className="mt-2 space-y-1 text-[14px] leading-tight text-[#525252]">{children}</div>
    </div>
  );
}

export default function ContactInfoRow() {
  const { t, language } = useLanguage();
  const { data: clinicInfo } = useClinicInfo();
  const { data: workingHours } = useWorkingHours();

  const emails = clinicInfo?.emails ?? [];
  const phones = clinicInfo?.phone_numbers ?? [];
  const location = clinicInfo?.location ?? '';

  const hourItems = (workingHours ?? []) as WorkingHour[];
  const topHours = hourItems.map((item) => {
    const labelRaw = normalizeDayLabel(item?.days, item?.closed_days);
    const isClosed = Boolean(item?.closed_days) || !item?.start_time || !item?.end_time;

    const start = formatTimeForDisplay(item?.start_time, ':');
    const end = formatTimeForDisplay(item?.end_time, ':');
    const timeText = isClosed ? t('footer.closed') : `(${start}-${end})`;

    const label = (() => {
      if (language !== 'es') return labelRaw;
      const map: Record<string, string> = {
        Mon: 'Lun',
        Tue: 'Mar',
        Wed: 'Mié',
        Thu: 'Jue',
        Fri: 'Vie',
        Sat: 'Sáb',
        Sun: 'Dom',
      };
      const rangeMatch = labelRaw.match(/^([A-Za-z]{3})\s*-\s*([A-Za-z]{3})$/);
      if (rangeMatch) {
        const from = map[rangeMatch[1]] ?? rangeMatch[1];
        const to = map[rangeMatch[2]] ?? rangeMatch[2];
        return `${from}-${to}`;
      }
      return map[labelRaw] ?? labelRaw;
    })();

    return { label, timeText, id: item.id };
  });

  return (
    <section className="px-4 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
          <InfoCard icon={<MdEmail className="h-6 w-6" />} title={t('contact.info.emailTitle')}>
            {emails.length ? (
              emails.map((e) => <div key={e}>{e}</div>)
            ) : (
              <div>-</div>
            )}
          </InfoCard>

          <InfoCard icon={<MdPhone className="h-6 w-6" />} title={t('contact.info.phoneTitle')}>
            {phones.length ? (
              phones.map((p) => <div key={p}>{p}</div>)
            ) : (
              <div>-</div>
            )}
          </InfoCard>

          <InfoCard icon={<MdLocationOn className="h-6 w-6" />} title={t('contact.info.locationTitle')}>
            <div>{location || '-'}</div>
          </InfoCard>

          <InfoCard icon={<FiClock className="h-6 w-6" />} title={t('contact.info.workingDayTitle')}>
            {topHours.length ? (
              topHours.map((h) => (
                <div key={String(h.id)}>
                  {h.label} {h.timeText}
                </div>
              ))
            ) : (
              <div>-</div>
            )}
          </InfoCard>
        </div>
      </div>
    </section>
  );
}
