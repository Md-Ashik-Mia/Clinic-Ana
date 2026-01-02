import PageHeader from '@/components/shared/PageHeader';
import TestimonialsSection from './component/TestimonialsSection';

export default function TestimonialsPage() {
  return (
    <div className="pt-56 pb-10 px-4 container mx-auto">
      <PageHeader
        title="What Our Patient Say"
        description="Hear real stories from patients who regained strength, mobility, and confidence through our care."
      />

      <div className="mt-12">
        <TestimonialsSection />
      </div>
    </div>
  );
}
