import LegalContent from '@/components/shared/LegalContent';

export const metadata = {
  title: 'Privacy Policy | Fisioterapia Ana España',
};

export default function PrivacyPolicyPage() {
  return <LegalContent titleKey="legal.privacy.title" contentKey="legal.privacy.content" />;
}
