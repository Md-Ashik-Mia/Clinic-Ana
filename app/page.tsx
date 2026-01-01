import HeroSection from "./component/HeroSection";
import WorkingHours from "./component/WorkingHours";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Normal sections AFTER hero */}
      <section className="">
        {/* Working Hours */}
        <WorkingHours />
      </section>
    </>
  );
}
