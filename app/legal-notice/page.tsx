import LegalContent from '@/components/shared/LegalContent';

export const metadata = {
  title: 'Legal Notice | Fisioterapia Ana España',
};

export default function LegalNoticePage() {
  return <LegalContent titleKey="legal.notice.title" contentKey="legal.notice.content" />;
}
