// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";
// // import { usePathname } from "next/navigation";

// // const navItems = [
// //   { label: "Home", href: "/" },
// //   { label: "Services", href: "/services" },
// //   { label: "About us", href: "/about" },
// //   { label: "Testimonials", href: "/testimonials" },
// //   { label: "Contact", href: "/contact" },
// // ];

// // const activeStyle ="bg-[#00A991] text-white"

// // export default function Navbar() {
// //   const pathname = usePathname();

// //   return (
// //     <header className="fixed top-0 left-0 w-full z-50">
// //       <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
// //         {/* Logo */}
// //         <Link href="/" className="font-bold text-primary text-lg">
// //           <Image src="/images/logo/logo.png" alt="Anaespana Clinic Logo" width={170} height={70} />
// //         </Link>

// //         {/* Nav */}
// //         <ul className="hidden md:flex items-center gap-3">
// //           {navItems.map((item) => {
// //             const isActive =
// //               item.href === "/"
// //                 ? pathname === "/"
// //                 : pathname.startsWith(item.href);

// //             return (
// //               <li key={item.href}>
// //                 <Link
// //                   href={item.href}
// //                   className={`
// //                     px-4 py-1.5 rounded-md text-sm font-medium transition-all
// //                     ${
// //                       isActive
// //                         ? activeStyle
// //                         : "text-slate-700 hover:bg-primary/10 hover:text-primary"
// //                     }
// //                   `}
// //                 >
// //                   {item.label}
// //                 </Link>
// //               </li>
// //             );
// //           })}
// //         </ul>

// //         {/* Language */}
// //         <div className="flex gap-2">
// //           <button className="px-3 py-1 text-xs rounded-full bg-primary text-white">
// //             EN
// //           </button>
// //           <button className="px-3 py-1 text-xs rounded-full border">
// //             ES
// //           </button>
// //         </div>
// //       </nav>
// //     </header>
// //   );
// // }


// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

// const navItems = [
//   { label: "Home", href: "/" },
//   { label: "Services", href: "/services" },
//   { label: "About us", href: "/about" },
//   { label: "Testimonials", href: "/testimonials" },
//   { label: "Contact", href: "/contact" },
// ];

// const activeStyle = "bg-[#00A991] text-white";

// export default function Navbar() {
//   const pathname = usePathname();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         scrolled ? "bg-white/70 backdrop-blur-lg shadow-md" : "bg-transparent"
//       }`}
//     >
//       <nav className="container mx-auto  h-20  flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="">
//           <Image src="/images/logo/logo.png" alt="Anaespana Clinic Logo" width={140} height={20} className="mb-4" />
//         </Link>
//         {/* Nav */}
//         <ul className="hidden md:flex items-center gap-3">
//           {navItems.map((item) => {
//             const isActive =
//               item.href === "/"
//                 ? pathname === "/"
//                 : pathname.startsWith(item.href);

//             return (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className={`px-4 py-5 rounded-md text-lg font-medium transition-all ${
//                     isActive ? activeStyle : "text-slate-700 hover:bg-primary/10 hover:text-primary"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>

//         {/* Language */}
//         <div className="flex gap-2">
//           <button className="px-3 py-1 text-xs rounded-full bg-primary text-white">
//             EN
//           </button>
//           <button className="px-3 py-1 text-xs rounded-full border">
//             ES
//           </button>
//         </div>
//       </nav>
//     </header>
//   );
// }




"use client";

import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { key: "nav.home", href: "/" },
  { key: "nav.services", href: "/services" },
  { key: "nav.about", href: "/about" },
  { key: "nav.testimonials", href: "/testimonials" },
  { key: "nav.contact", href: "/contact" },
] as const;

const activeStyle = "bg-[#00A991] text-white px-2 py-1 rounded-[4px] font-medium text-[16px]";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/70 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto h-20 flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <Image
            src="/images/logo/logo.png"
            alt="Anaespana Clinic Logo"
            width={140}
            height={20}
            className="mb-4"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        {/* Nav (desktop) */}
        <ul className="hidden md:flex items-center gap-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition-all ${
                    isActive
                      ? activeStyle
                      : "text-[#212121] px-2 py-1 rounded-sm font-medium text-[16px] hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language (desktop) */}
          <div className="hidden md:flex">
            <LanguageSwitcher />
          </div>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            className="icon-interactive md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-primary/10 hover:text-primary transition"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/90 backdrop-blur-lg shadow-md">
          <div className="container mx-auto px-6 py-4">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block rounded-md px-4 py-3 text-base font-medium transition-all ${
                        isActive
                          ? activeStyle
                          : "text-slate-700 hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
