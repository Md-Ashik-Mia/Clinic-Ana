import PageHeader from '@/components/shared/PageHeader';
import TestimonialsSection from './component/TestimonialsSection';

export default function TestimonialsPage() {
  return (
    <div className="pt-56 pb-10 px-4 container mx-auto">
      <PageHeader
		titleKey="page.testimonials.title"
		descriptionKey="page.testimonials.description"
      />

      <div className="mt-12">
        <TestimonialsSection />
      </div>
    </div>
  );
}
