import Navbar from "@/components/layout/Navbar";
import { LanguageProvider } from "@/hooks/useLanguage";
import { QueryProvider } from "@/lib/queryProvider";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"], // matches Figma usage
  variable: "--font-lato",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Anaespana Clinic",
    template: "%s | Anaespana Clinic",
  },
  description: "Anaespana Clinic",
  icons: {
    icon: "/images/fabicon/favicon.ico",
    shortcut: "/images/fabicon/favicon.ico",
    apple: "/images/fabicon/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.variable}>
      <body
        className={`${lato.variable} antialiased`}
      >
      <QueryProvider>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </QueryProvider>
      </body>
    </html>
  );
}
