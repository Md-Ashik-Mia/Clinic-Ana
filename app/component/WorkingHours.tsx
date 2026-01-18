// components/WorkingHours.tsx
'use client';

import SectionTitle from '@/components/shared/SectionTitle';
import { useLanguage } from '@/hooks/useLanguage';
import { useWorkingHours } from '../../hooks/useWorkingHours';

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
  // Expected backend format: HH:MM:SS
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

  // Common abbreviations to match the UI (e.g. Monday-Thursday -> Mon-Thu)
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

  // Handle ranges like "Monday-Thursday" or "Monday-Friday"
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

export default function WorkingHours() {
  const { language, t } = useLanguage();
  const { data: workingHours, isLoading, isError } = useWorkingHours();
  const items = (workingHours ?? []) as WorkingHour[];

  if (isLoading) return (
    <div className="flex justify-center items-center py-20">
      <div className="text-lg">{t('workingHours.loading')}</div>
    </div>
  );

  if (isError) return (
    <div className="flex justify-center items-center py-20">
      <div className="text-lg text-red-500">{t('workingHours.error')}</div>
    </div>
  );

  return (
    <section className="bg-background py-16">
      <div className="page-container text-center">
        <SectionTitle
          className="mb-14"
          greenText={t('workingHours.titleGreen')}
          blackText={t('workingHours.titleBlack')}
          description={t('workingHours.description')}
          descriptionClassName="mx-auto mt-4 lg:max-w-4xl text-base md:text-2xl text-grayColor"
          titleClassName="text-[42px] font-semibold"
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {items.map((item: WorkingHour) => {
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

            return (
              <div
                key={item.id}
                className="min-h-39.25 h-auto w-78 rounded-md bg-[#E6F6F4]  py-3.5 flex flex-col justify-center gap-2.5"
              >
                <div className="text-3xl  text-blackColor">{label}</div>
                {isClosed ? (
                  <div className="text-[32px] font-bold text-grayColor">({t('workingHours.closed')})</div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {slots.map((slot) => {
                      const start = formatTimeForDisplay(slot?.start_time);
                      const end = formatTimeForDisplay(slot?.end_time);
                      return (
                        <div key={slot.id} className="text-[28px] font-bold text-grayColor">
                          ({start} - {end})
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
