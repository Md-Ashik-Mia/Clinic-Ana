
import AboutSection from '@/components/shared/AboutSection';
import PageHeader from '@/components/shared/PageHeader';
import MeetTeamSection from './components/MeetTeamSection';

export default function AboutPage() {
  return (
    <div className="pt-56 pb-10 px-4 container  mx-auto">
      <PageHeader
        title="Dedicated to Your Recovery"
        description="Our clinic combines experienced therapists, modern techniques, and compassionate care to support your full recovery journey."
      />
    <div className="mt-12 space-y-20">
              <AboutSection
        title="Physiotherapy Care"
        highlight="Trusted"
        highlightColor="#00A991"
        description="Our hospital is dedicated to delivering high-quality physiotherapy services in a safe and professional environment. With modern facilities and patient-focused care, we aim to support recovery, improve mobility, and enhance overall quality of life for every individual we serve."
        image="images/aboutus/image1.png"
        imageAlt="Physiotherapy care"
        reverse={false}
      />
      <AboutSection
        title="Care for Every Patient"
        highlight="Focused"
        highlightColor="#00A991"
        description="We provide personalized treatment plans, flexible appointment options, and continuous guidance throughout the recovery process. Our goal is to ensure each patient feels supported, informed, and confident at every stage of their therapy journey."
        image="images/aboutus/image2.png"
        imageAlt="Focused care for every patient"
        reverse={true}
      />
      <AboutSection
        title="Physiotherapy Specialists"
        highlight="Meet Our"
        highlightColor="#00A991"
        description="Our team consists of experienced and certified physiotherapists who specialize in various rehabilitation and pain management techniques. We are committed to delivering the highest standard of care, tailored to individual needs."
        image="images/aboutus/image3.png"
        imageAlt="Physiotherapy specialists team"
        reverse={false}
      />
    </div>

    <MeetTeamSection />
    </div>
  );
}
