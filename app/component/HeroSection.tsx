// import Image from "next/image";

// export default function HeroSection() {
//   return (
//     <section className="relative min-h-screen w-full overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute top-0 left-0 w-full h-full">
//         <Image
//           src="/images/hero/hero-bg.png" // Background Image
//           alt="Physiotherapy Background"
//           layout="fill"
//           objectFit="cover"
//           priority
//         />
//       </div>

//       {/* Content Overlay */}
//       <div className="relative z-10 container mx-auto px-6 pt-32 lg:pt-48 flex justify-between items-center gap-12">
//         {/* Left content */}
//         <div className="w-full md:w-1/2 text-white space-y-4">
//           <p className="text-lg text-primary">Advanced</p>
//           <h1 className="text-5xl font-bold leading-tight">
//             Physiotherapy
//           </h1>
//           <p className="text-xl mt-3">
//             for Pain Relief & Mobility
//           </p>
//           <p className="text-lg mt-4 max-w-lg">
//             Experience expert physiotherapy care in a warm, supportive
//             environment focused on your long-term well-being.
//           </p>

//           <div className="mt-8 flex gap-4">
//             <button className="bg-primary text-white px-6 py-3 rounded-full">
//               Book on WhatsApp
//             </button>
//             <button className="border text-primary px-6 py-3 rounded-full">
//               View Treatments
//             </button>
//           </div>
//         </div>

//         {/* Right Image */}
//         <div className="hidden lg:block relative w-1/2 h-full">
//           <Image
//             src="/images/hero/hero-section.png"
//             alt="Physiotherapy"
//             layout="fill"
//             objectFit="contain"
//             className="w-full h-full"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { getWhatsAppHref, useClinicInfo } from "@/hooks/useClinicInfo";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import Link from "next/link";
import { SiWhatsapp } from "react-icons/si";

export default function HeroSection() {
  const { data: clinicInfo } = useClinicInfo();
  const { t } = useLanguage();
  const whatsappHref = getWhatsAppHref(clinicInfo?.whatsapp_numbers ?? null);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/images/hero/hero-bg.png" // Background Image
          alt="Physiotherapy Background"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw" // Added sizes for optimization
        />
      </div>

      {/* Bottom blur fade (smooth transition into next section) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-7 z-20 h-20 sm:h-25 lg:h-22 bg-gradient-to-b from-transparent via-background/70 to-background backdrop-blur-[27px]"
      />

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 pt-28 lg:pt-48 flex flex-col lg:flex-row justify-between items-center gap-12">
        {/* Left content */}
        {/* <div className="w-full md:w-1/2 text-white space-y-4">
          <p className="text-lg text-primary">Advanced</p>
          <h1 className="text-5xl font-bold leading-tight">
            Physiotherapy
          </h1>
          <p className="text-xl mt-3">
            for Pain Relief & Mobility
          </p>
          <p className="text-lg mt-4 max-w-lg">
            Experience expert physiotherapy care in a warm, supportive
            environment focused on your long-term well-being.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-full">
              Book on WhatsApp
            </button>
            <button className="border text-primary px-6 py-3 rounded-full">
              View Treatments
            </button>
          </div>
        </div> */}

        {/* Right Image */}
        {/* <div className="hidden lg:block relative w-1/2 h-full">
          <Image
            src="/images/hero/hero-section.png" // Right Image
            alt="Physiotherapy"
            layout="fill"
            objectFit="contain"
            sizes="(max-width: 768px) 100vw, 50vw" // Added sizes for optimization
          />
        </div> */}

        <div className="w-full lg:w-1/2">
          <div className="w-full relative flex flex-col justify-center">
            <h1 className="font-semibold text-3xl sm:text-4xl lg:text-5xl oceanGreen-color">
              {t("home.hero.advanced")}
            </h1>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-tight secondary-color my-4">
              {t("home.hero.physiotherapy")}
            </h1>

            <p className="text-2xl sm:text-3xl lg:text-[42px] mt-6 text-blackColor font-semibold">
              {t("home.hero.tagline")}
            </p>
            <p className="text-base sm:text-lg mt-4 max-w-lg textHeading-color mb-10 lg:mb-24">
              {t("home.hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
              <a
                href={whatsappHref || undefined}
                target="_blank"
                rel="noreferrer"
                className="btn-interactive flex justify-center items-center gap-3.5 text-white bg-[#00A991] px-6 py-3 rounded-full"
              >
                <span className="text-2xl bg-[#1FAF38] text-[#60D669]">
                  <SiWhatsapp />
                </span>
                {t("home.hero.bookOnWhatsapp")}
              </a>
              <Link
                href="/services"
                className="btn-interactive inline-flex items-center justify-center p-3 border-2 border-[#212121] font-semibold rounded-4xl"
              >
                {t("home.hero.viewTreatments")}
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="bg-[url('/images/hero/hero-section.png')] bg-contain bg-no-repeat bg-center w-full h-[360px] sm:h-[480px] lg:h-[750px] relative" />
        </div>
      </div>
    </section>
  );
}
