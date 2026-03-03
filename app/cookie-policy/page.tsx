import LegalContent from '@/components/shared/LegalContent';

export const metadata = {
  title: 'Cookie Policy | Fisioterapia Ana España',
};

export default function CookiePolicyPage() {
  return <LegalContent titleKey="legal.cookies.title" contentKey="legal.cookies.content" />;
}
