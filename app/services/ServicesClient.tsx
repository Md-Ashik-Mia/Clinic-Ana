"use client";

import PageHeader from '@/components/shared/PageHeader';
import { useLanguage } from '@/hooks/useLanguage';
import { useTreatments } from '@/hooks/useTreatments';
import TreatMentCard from './components/TreatMentCard';

export default function ServicesClient() {
  const { data: treatments, isLoading, isError } = useTreatments();
  const { t } = useLanguage();

  return (
    <div className="pt-56 pb-10 px-4">
      <PageHeader titleKey="page.services.title" descriptionKey="page.services.description" />

      <div className="mt-12">
        {isLoading ? (
          <div className="text-center text-gray-500">{t('common.loadingTreatments')}</div>
        ) : isError ? (
          <div className="text-center text-red-500">{t('common.failedLoadTreatments')}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {treatments?.map((treatment) => (
              <TreatMentCard key={treatment.id} treatment={treatment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
