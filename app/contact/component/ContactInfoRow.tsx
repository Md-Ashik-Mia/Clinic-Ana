'use client';

import { useClinicInfo } from '@/hooks/useClinicInfo';
import { useLanguage } from '@/hooks/useLanguage';
import { useWorkingHours } from '@/hooks/useWorkingHours';
import type { ReactNode } from 'react';
import { FiClock } from 'react-icons/fi';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

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
  if (!time || typeof time !== 'string') return '';
  const [hhRaw, mmRaw] = time.split(':');
  const hours24 = parseInt(hhRaw ?? '0', 10);
  const minutes = String(parseInt(mmRaw ?? '0', 10)).padStart(2, '0');
  const suffix = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${minutes} ${suffix}`;
}

function normalizeDayLabel(
  days: string | null | undefined,
  daysEs: string | null | undefined,
  closedDays: string | null | undefined,
  closedDaysEs: string | null | undefined,
  language: 'en' | 'es',
  emptyLabel: string,
): string {
  const rawLabel = language === 'es'
    ? (daysEs || closedDaysEs || '')
    : (days || closedDays || '');
  const label = rawLabel.trim();
  if (!label) return emptyLabel;

  const mapEn: Record<string, string> = {
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
    Sunday: 'Sun',
  };

  const mapEs: Record<string, string> = {
    Monday: 'Lun',
    Tuesday: 'Mar',
    Wednesday: 'Mié',
    Thursday: 'Jue',
    Friday: 'Vie',
    Saturday: 'Sáb',
    Sunday: 'Dom',
  };

  const map = language === 'es' ? mapEs : mapEn;

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
    const label = normalizeDayLabel(
      item?.days,
      item?.days_es,
      item?.closed_days,
      item?.closed_days_es,
      language,
      t('workingHours.noSpecificDays'),
    );
    const slots = (item?.slots ?? []).filter((slot) => slot?.start_time && slot?.end_time);
    const isClosed = Boolean(item?.closed_days || item?.closed_days_es) || slots.length === 0;
    return { label, slots, isClosed, id: item.id };
  });

  return (
    <section>
      <div className="page-container">
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
                  <div>{h.label}</div>
                  {h.isClosed ? (
                    <div>{t('workingHours.closed')}</div>
                  ) : (
                    h.slots.map((slot) => {
                      const start = formatTimeForDisplay(slot?.start_time);
                      const end = formatTimeForDisplay(slot?.end_time);
                      return (
                        <div key={String(slot.id)}>
                          ({start} - {end})
                        </div>
                      );
                    })
                  )}
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
