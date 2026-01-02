"use client";
import PageHeader from '@/components/shared/PageHeader';
import { useTreatments } from '@/hooks/useTreatments';
import TreatMentCard from './components/TreatMentCard';

export default function ServicesPage() {
  const { data: treatments, isLoading, isError } = useTreatments();

  return (
    <div className="pt-56 pb-10 px-4">
      <PageHeader
        title="Comprehensive Physiotherapy Care"
        description="From injury rehabilitation to pain management, our services are tailored to meet your individual health needs."
      />

      <div className="mt-12">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading treatments...</div>
        ) : isError ? (
          <div className="text-center text-red-500">Failed to load treatments.</div>
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
