"use client";

import AboutSection from '@/components/shared/AboutSection';
import PageHeader from '@/components/shared/PageHeader';
import { useAboutUsSections } from '@/hooks/useAboutUsSections';
import { useLanguage } from '@/hooks/useLanguage';
import MeetTeamSection from './components/MeetTeamSection';

function AboutSectionSkeleton({ reverse }: { reverse?: boolean }) {
  return (
    <section
      className={`w-full animate-pulse flex flex-col-reverse ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-between gap-8 md:gap-12 lg:gap-[19px] mb-12 lg:mb-16`}
      aria-label="Loading section"
    >
      <div className="flex-1 min-w-0 max-w-full lg:max-w-[530px] text-left px-1 sm:px-4 md:px-0">
        <div className="h-10 sm:h-12 md:h-14 lg:h-16 w-3/4 rounded-md bg-gray-200" />
        <div className="mt-4 space-y-3">
          <div className="h-4 sm:h-5 w-full rounded bg-gray-200" />
          <div className="h-4 sm:h-5 w-11/12 rounded bg-gray-200" />
          <div className="h-4 sm:h-5 w-10/12 rounded bg-gray-200" />
          <div className="h-4 sm:h-5 w-9/12 rounded bg-gray-200" />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center w-full max-w-full">
        <div className="w-full aspect-square max-w-[350px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[730px]">
          <div className="rounded-[20px] w-full h-full bg-gray-200" />
        </div>
      </div>
    </section>
  );
}

export default function AboutClient() {
  const { t, language } = useLanguage();
  const { data: sections, isLoading, isError } = useAboutUsSections();

  return (
    <div className="pt-56 pb-10 px-4 container  mx-auto">
      <PageHeader titleKey="page.about.title1" descriptionKey="page.about.desc1" />

      <div className="mt-12 space-y-20">
        {isLoading ? (
          <>
            <AboutSectionSkeleton reverse={false} />
            <AboutSectionSkeleton reverse={true} />
            <AboutSectionSkeleton reverse={false} />
          </>
        ) : isError ? (
          <div className="text-center text-red-500">{t('about.errorSections')}</div>
        ) : (
          (sections ?? []).map((section) => {
            const title = (language === 'es' ? section.title_es : null) || section.title || section.title_es || '';
            const highlight =
              (language === 'es' ? section.highlight_es : null) || section.highlight || section.highlight_es || '';
            const description =
              (language === 'es' ? section.description_es : null) || section.description || section.description_es || '';
            const imageAlt =
              (language === 'es' ? section.image_alt_es : null) || section.image_alt || section.image_alt_es || '';

            return (
              <AboutSection
                key={section.id}
                title={title}
                highlight={highlight}
                highlightColor={section.highlight_color ?? '#00A991'}
                description={description}
                image={section.image}
                imageAlt={imageAlt || 'About section image'}
                reverse={Boolean(section.reverse)}
              />
            );
          })
        )}
      </div>

      <MeetTeamSection />
    </div>
  );
}
