import PageHeader from '@/components/shared/PageHeader';
import BookDirectlySection from './component/BookDirectlySection';
import ContactInfoRow from './component/ContactInfoRow';
import ReachOutSection from './component/ReachOutSection';

export default function ContactPage() {
  return (
    <div className="pt-56 pb-0">
      <div className="px-4">
        <PageHeader
          title="Contact Our Physiotherapy Team"
          description="Have questions about your recovery or our treatments? Send us a message and our team will respond promptly to guide you."
        />
      </div>

      <ContactInfoRow />
      <ReachOutSection />
      <BookDirectlySection />
    </div>
  );
}
