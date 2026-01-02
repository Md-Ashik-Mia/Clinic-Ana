import Footer from "@/components/layout/Footer";
import CTASection from "./component/CTASection";
import HeroSection from "./component/HeroSection";
import SpecializedTreatments from "./component/SpecializedTreatments";
import TestimonialsPreview from "./component/TestimonialsPreview";
import WhyChooseUs from "./component/WhyChooseUs";
import WorkingHours from "./component/WorkingHours";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Normal sections AFTER hero */}
      <section className="">
        {/* Working Hours */}
        <WorkingHours />
      </section>

      <SpecializedTreatments />

      <WhyChooseUs />

      <TestimonialsPreview />

      <CTASection />

      <Footer />
    </>
  );
}
