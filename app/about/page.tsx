
import AboutSection from '@/components/shared/AboutSection';
import PageHeader from '@/components/shared/PageHeader';
import MeetTeamSection from './components/MeetTeamSection';

export default function AboutPage() {
  return (
    <div className="pt-56 pb-10 px-4 container  mx-auto">
      <PageHeader
		titleKey="page.about.title1"
		descriptionKey="page.about.desc1"
      />
    <div className="mt-12 space-y-20">
              <AboutSection
		titleKey="page.about.title2"
              highlightKey="about.highlight.trusted"
        highlightColor="#00A991"
		descriptionKey="page.about.desc2"
        image="images/aboutus/image1.png"
        imageAlt="Physiotherapy care"
        reverse={false}
      />
      <AboutSection
		titleKey="page.about.title3"
      highlightKey="about.highlight.focused"
        highlightColor="#00A991"
		descriptionKey="page.about.desc3"
        image="images/aboutus/image2.png"
        imageAlt="Focused care for every patient"
        reverse={true}
      />
      <AboutSection
		titleKey="page.about.title4"
      highlightKey="about.highlight.meetOur"
        highlightColor="#00A991"
		descriptionKey="page.about.desc4"
        image="images/aboutus/image3.png"
        imageAlt="Physiotherapy specialists team"
        reverse={false}
      />
    </div>

    <MeetTeamSection />
    </div>
  );
}
