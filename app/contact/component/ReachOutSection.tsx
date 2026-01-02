'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { FiNavigation } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';

import { useClinicInfo } from '@/hooks/useClinicInfo';
import { useLanguage } from '@/hooks/useLanguage';
import axiosInstance from '@/lib/axiosInstance';

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const INPUT_BG = '#D9F2EF';

export default function ReachOutSection() {
  const { data: clinicInfo } = useClinicInfo();
  const { t } = useLanguage();

  const [form, setForm] = useState<ContactPayload>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mapQuery = useMemo(() => {
    const q = (clinicInfo?.location ?? '').trim();
    return q || 'Clinic';
  }, [clinicInfo?.location]);

  const directionsHref = (clinicInfo?.location_link ?? '').trim();

  const onChange = (key: keyof ContactPayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onCancel = () => {
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await axiosInstance.post('/reviews/contact/', {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      onCancel();
      toast.success(t('toast.contact.success'), {
        position: 'top-center',
        autoClose: 3000,
      });
    } catch {
      toast.error(t('toast.contact.error'), {
        position: 'top-center',
        autoClose: 3500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 mb-20">
      <ToastContainer />
      <div className="container mx-auto">
        <div className="rounded-3xl bg-[#E6F6F4] px-6 py-8 lg:px-10 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Title + form */}
            <div>
              <h2 className="text-[32px] font-semibold leading-none text-[#1A1A1A]">{t('contact.reachOut.title')}</h2>
              <p className="mt-2 max-w-97.5 text-[14px] text-[#525252]">
                {t('contact.reachOut.subtitle')}
              </p>

              <form onSubmit={onSubmit} className="mt-6 w-full max-w-102.5 space-y-5">
                <div>
                  <label className="block text-blackColor text-[20px] leading-none">
                    {t('contact.form.name')}<span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    className="mt-2 w-full h-11.5 rounded-xl px-4 text-blackColor border border-transparent border-b-2 border-b-[#525252] outline-none"
                    style={{ backgroundColor: INPUT_BG }}
                  />
                </div>

                <div>
                  <label className="block text-blackColor text-[20px] leading-none">
                    {t('contact.form.email')}<span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    className="mt-2 w-full h-11.5 rounded-xl px-4 text-blackColor border border-transparent border-b-2 border-b-[#525252] outline-none"
                    style={{ backgroundColor: INPUT_BG }}
                  />
                </div>

                <div>
                  <label className="block text-blackColor text-[20px] leading-none">
                    {t('contact.form.phone')}<span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                    className="mt-2 w-full h-11.5 rounded-xl px-4 text-blackColor border border-transparent border-b-2 border-b-[#525252] outline-none"
                    style={{ backgroundColor: INPUT_BG }}
                  />
                </div>

                <div>
                  <label className="block text-blackColor text-[20px] leading-none">
                    {t('contact.form.subject')}<span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => onChange('subject', e.target.value)}
                    className="mt-2 w-full h-11.5 rounded-xl px-4 text-blackColor border border-transparent border-b-2 border-b-[#525252] outline-none"
                    style={{ backgroundColor: INPUT_BG }}
                  >
                    <option value="" disabled>
                      {t('contact.form.selectSubject')}
                    </option>
                    <option value="General">{t('contact.form.subject.general')}</option>
                    <option value="Appointment">{t('contact.form.subject.appointment')}</option>
                    <option value="Treatment">{t('contact.form.subject.treatment')}</option>
                    <option value="Other">{t('contact.form.subject.other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-blackColor text-[20px] leading-none">
                    {t('contact.form.message')}<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => onChange('message', e.target.value)}
                    className="mt-2 w-full h-42.75 rounded-xl px-4 py-3 text-blackColor border border-transparent border-b-2 border-b-[#525252] outline-none resize-none"
                    style={{ backgroundColor: INPUT_BG }}
                  />
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-interactive h-10.5 rounded-[20px] px-7.75 py-1.5 bg-[#00A991] text-white flex items-center justify-center gap-2.5 disabled:opacity-60"
                  >
                    <span className="text-base">{t('contact.form.send')}</span>
                    <RiSendPlaneFill className="text-base" />
                  </button>
                  <button
                    type="button"
                    onClick={onCancel}
                    className="btn-interactive h-10.5 rounded-[20px] px-7.75 py-1.5 border border-black/70 text-blackColor"
                  >
                    <span className="text-base">{t('common.cancel')}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Map */}
            <div className="h-full flex flex-col justify-center ">
              <div className="w-full overflow-hidden rounded-[20px] bg-white">
                <iframe
                  title="Clinic Map"
                  className="h-80 w-full lg:h-105"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                />
              </div>

              <div className="mt-6 flex justify-center">
                <a
                  href={directionsHref || undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-interactive h-10.5 rounded-[20px] px-7.75 py-1.5 bg-[#00A991] text-white flex items-center justify-center gap-2.5"
                >
                  <FiNavigation className="text-base" />
                  <span className="text-[22px] font-semibold leading-none">{t('contact.directions')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
