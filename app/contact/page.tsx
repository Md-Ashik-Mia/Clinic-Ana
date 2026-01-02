import PageHeader from '@/components/shared/PageHeader';
import type { Metadata } from 'next';
import BookDirectlySection from './component/BookDirectlySection';
import ContactInfoRow from './component/ContactInfoRow';
import ReachOutSection from './component/ReachOutSection';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <div className="pt-56 pb-0">
      <div className="px-4">
        <PageHeader
			titleKey="page.contact.title"
			descriptionKey="page.contact.description"
        />
      </div>

      <ContactInfoRow />
      <ReachOutSection />
      <BookDirectlySection />
    </div>
  );
}
