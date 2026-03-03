'use client';

import { useLanguage } from '@/hooks/useLanguage';
import ReactMarkdown from 'react-markdown';

interface LegalContentProps {
  titleKey: string;
  contentKey: string;
}

export default function LegalContent({ titleKey, contentKey }: LegalContentProps) {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="page-container max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-bold text-[#006557] mb-10">
          {t(titleKey)}
        </h1>
        <div className="prose prose-lg max-w-none text-[#525252] prose-headings:text-[#006557] prose-strong:text-[#003B33] prose-a:text-[#00A991]">
          <ReactMarkdown>
            {t(contentKey)}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
