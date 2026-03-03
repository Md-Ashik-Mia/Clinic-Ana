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
    default: "Fisioterapia y osteopatía Ana España",
    template: "%s | Fisioterapia y osteopatía Ana España",
  },
  description: "Clínica de fisioterapia y osteopatía Ana España en Tarifa. Especialistas en rehabilitación, dolor y bienestar.",
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
    <html lang="es" className={lato.variable}>
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
