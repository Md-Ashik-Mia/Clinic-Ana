'use client';

import { getWhatsAppHref, useClinicInfo } from '@/hooks/useClinicInfo';
import { useLanguage } from '@/hooks/useLanguage';
import { SiWhatsapp } from 'react-icons/si';

export default function BookDirectlySection() {
  const { data: clinicInfo } = useClinicInfo();
  const { t } = useLanguage();
  const href = getWhatsAppHref(clinicInfo?.whatsapp_numbers ?? null);

  return (
    <section className="bg-[#B0E4DD] px-4 py-10">
      <div className="container mx-auto">
        <div className="text-center">
          <h3 className="text-[42px] font-semibold leading-none text-[#007F6D]">{t('contact.bookDirect.title')}</h3>
          <p className="mx-auto mt-4 max-w-112.25 text-[18px] leading-tight text-[#525252]">
            {t('contact.bookDirect.subtitle')}
          </p>

          <div className="mt-6 flex justify-center">
            <a
              href={href || undefined}
              target="_blank"
              rel="noreferrer"
              className="btn-interactive h-12 rounded-[30px] bg-[#00A991] px-5 py-2.5 text-white inline-flex items-center justify-center gap-2.5"
            >
              <span className="text-2xl leading-none">
                <SiWhatsapp />
              </span>
              <span className="text-[22px] font-semibold leading-none">{t('action.bookWhatsApp')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
