
'use client';

import { useState, type FormEvent } from 'react';
import { MdEmail, MdPhone } from 'react-icons/md';
import { RiSendPlaneFill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';

import SectionTitle from '@/components/shared/SectionTitle';
import { useClinicInfo } from '@/hooks/useClinicInfo';
import { useLanguage } from '@/hooks/useLanguage';
import axiosInstance from '@/lib/axiosInstance';

type ContactPayload = {
	name: string;
	email: string;
	phone: string;
	message: string;
};

const INPUT_BG = '#D9F2EF';

export default function CTASection() {
	const { data: clinicInfo } = useClinicInfo();
	const { t } = useLanguage();
	const primaryPhone = clinicInfo?.phone_numbers?.[0] ?? '';
	const primaryEmail = clinicInfo?.emails?.[0] ?? '';

	const [form, setForm] = useState<ContactPayload>({
		name: '',
		email: '',
		phone: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onChange = (key: keyof ContactPayload, value: string) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const onCancel = () => {
		setForm({ name: '', email: '', phone: '', message: '' });
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
				message: form.message.trim(),
			});
			onCancel();
			toast.success(t('home.cta.toastSuccess'), {
				position: 'top-center',
				autoClose: 3000,
			});
		} catch {
			toast.error(t('home.cta.toastError'), {
				position: 'top-center',
				autoClose: 3500,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="py-12 sm:py-16 lg:py-20 px-4">
			<ToastContainer />
			<div className="mx-auto max-w-6xl">
				<div className="text-center">
					<SectionTitle
						greenText={t('home.cta.titleGreen')}
						blackText={t('home.cta.titleBlack')}
						description={
							<>
								{t('home.cta.descriptionLine1')}
								<br />
								{t('home.cta.descriptionLine2')}
							</>
						}
					/>
				</div>

				<div className="mt-10">
					<div className="mx-auto w-full max-w-[772px] rounded-3xl bg-[#E6F6F4] p-6 sm:p-8 ">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
							{/* Left info */}
							<div className="mb-2 h-full flex flex-col justify-center  ">
								<p className="text-blackColor text-xl sm:text-base">{t('home.cta.consultWithOur')}</p>
								<h3 className="mb-3 text-[32px] sm:text-[38px] font-bold leading-none text-[#006557]">
									{t('home.cta.physiotherapists')}
								</h3>
								<p className="mb-8 text-grayColor text-xs sm:text-sm max-w-[260px]">
									{t('home.cta.leftDescription')}
								</p>

								<div className="mt-6 space-y-5 text-grayColor ">
									<div className="flex items-center gap-3">
										<MdPhone style={{ width: 20, height: 18 }} className="shrink-0" />
										<span className="text-xs sm:text-lg text-[#000000]">{primaryPhone || '-'}</span>
									</div>
									<div className="flex items-center gap-3">
										<MdEmail style={{ width: 20, height: 18 }} className="shrink-0" />
										<span className="text-xs sm:text-lg text-[#000000]">{primaryEmail || '-'}</span>
									</div>
								</div>
							</div>

							{/* Form */}
							<form onSubmit={onSubmit} className="w-full">
								<div className="w-full md:w-[346px]">
									<div className="space-y-5">
										<div>
											<label className="block text-blackColor text-[20px] leading-none">
												{t('home.cta.form.name')}<span className="text-red-500">*</span>
											</label>
											<input
												required
												value={form.name}
												onChange={(e) => onChange('name', e.target.value)}
												className="mt-2 w-full h-[46px] rounded-[12px] px-4 text-blackColor placeholder:text-grayColor border border-transparent border-b border-b-[#525252] outline-none"
												style={{ backgroundColor: INPUT_BG }}
												placeholder=""
											/>
										</div>

										<div>
											<label className="block text-blackColor text-[20px] leading-none">
												{t('home.cta.form.email')}<span className="text-red-500">*</span>
											</label>
											<input
												required
												type="email"
												value={form.email}
												onChange={(e) => onChange('email', e.target.value)}
												className="mt-2 w-full h-[46px] rounded-[12px] px-4 text-blackColor placeholder:text-grayColor border border-transparent border-b border-b-[#525252] outline-none"
												style={{ backgroundColor: INPUT_BG }}
												placeholder=""
											/>
										</div>

										<div>
											<label className="block text-blackColor text-[20px] leading-none">
												{t('home.cta.form.phone')}<span className="text-red-500">*</span>
											</label>
											<input
												required
												inputMode="tel"
												value={form.phone}
												onChange={(e) => onChange('phone', e.target.value)}
												className="mt-2 w-full h-[46px] rounded-[12px] px-4 text-blackColor placeholder:text-grayColor border border-transparent border-b border-b-[#525252] outline-none"
												style={{ backgroundColor: INPUT_BG }}
												placeholder=""
											/>
										</div>

										<div>
											<label className="block text-blackColor text-[20px] leading-none">
												{t('home.cta.form.message')}<span className="text-red-500">*</span>
											</label>
											<textarea
												required
												value={form.message}
												onChange={(e) => onChange('message', e.target.value)}
												className="mt-2 w-full h-[171px] rounded-[12px] px-4 py-3 text-blackColor placeholder:text-grayColor border border-transparent border-b border-b-[#525252] outline-none resize-none"
												style={{ backgroundColor: INPUT_BG }}
												placeholder=""
											/>
										</div>
									</div>

									<div className="mt-6 flex items-center justify-start  gap-4">
										<button
											type="submit"
											disabled={isSubmitting}
											className="btn-interactive h-[42px] rounded-[20px] px-[31px] py-[6px] bg-[#00A991] text-white flex items-center justify-center gap-[10px] disabled:opacity-60"
										>
											<span className="text-base">{t('home.cta.form.send')}</span>
											<RiSendPlaneFill className="text-base" />
										</button>
										<button
											type="button"
											onClick={onCancel}
											className="btn-interactive h-[42px] rounded-[20px] px-[31px] py-[6px] border border-black/70 text-blackColor"
										>
											<span className="text-base">{t('home.cta.form.cancel')}</span>
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
