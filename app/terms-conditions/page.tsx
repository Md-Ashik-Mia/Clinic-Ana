import LegalContent from '@/components/shared/LegalContent';

export const metadata = {
  title: 'General Terms and Conditions | Fisioterapia Ana España',
};

export default function TermsConditionsPage() {
  return <LegalContent titleKey="legal.terms.title" contentKey="legal.terms.content" />;
}
