'use client';

import SectionTitle from '@/components/shared/SectionTitle';
import { useDoctors } from '@/hooks/useDoctors';
import { useLanguage } from '@/hooks/useLanguage';
import type { Doctor } from '@/types/doctor';
import { useMemo, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

const FALLBACK_AVATAR =
	'data:image/svg+xml;utf8,' +
	encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
  <rect width="100%" height="100%" fill="#EEF2F7"/>
  <circle cx="400" cy="310" r="140" fill="#CBD5E1"/>
  <rect x="180" y="480" width="440" height="220" rx="110" fill="#CBD5E1"/>
</svg>`);

function normalizeRemotePhotoUrl(raw?: string | null) {
	const s = (raw ?? '').trim();
	if (!s) return null;

	try {
		const u = new URL(s);
		// API sometimes returns double slashes in pathname: //media/...

		u.pathname = u.pathname.replace(/\/{2,}/g, '/');
		return u.toString();
	} catch {
		// best-effort for non-absolute values
		return s.replace(/\/{2,}/g, '/');
	}
}

function buildHiDpiSrcSet(url: string) {
	// If your backend/CDN supports dpr=, this will fetch sharper images on retina screens.
	// If it doesn't, it will behave the same as today (worst case: extra cache entries).
	const join = url.includes('?') ? '&' : '?';
	const dpr2 = `${url}${join}dpr=2`;
	const dpr3 = `${url}${join}dpr=3`;
	return `${url} 1x, ${dpr2} 2x, ${dpr3} 3x`;
}

function DoctorCard({ doctor, fetchPriority }: { doctor: Doctor; fetchPriority?: 'high' | 'low' | 'auto' }) {
	const fullName = `${doctor.first_name ?? ''} ${doctor.last_name ?? ''}`.trim();
	const specialty = doctor.specialties?.[0]?.name;

	const photoUrl = normalizeRemotePhotoUrl((doctor as any).photo);

	return (
		<div className="shrink-0 w-[302px]">
			<div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 aspect-square">
				<img
					src={photoUrl ?? FALLBACK_AVATAR}
					srcSet={photoUrl ? buildHiDpiSrcSet(photoUrl) : undefined}
					sizes="302px"
					width={302}
					height={302}
					alt={`${(doctor as any).first_name ?? ''} ${(doctor as any).last_name ?? ''}`.trim() || 'Doctor photo'}
					className="h-full w-full object-cover"
					style={{ transform: 'translateZ(0)' }}
					loading={fetchPriority === 'high' ? 'eager' : 'lazy'}
					fetchPriority={fetchPriority}
					decoding="async"
					onError={(e) => {
						// prevent infinite loop if fallback fails
						const img = e.currentTarget;
						if (img.src !== FALLBACK_AVATAR) img.src = FALLBACK_AVATAR;
					}}
				/>
			</div>

			<div className="mt-4 text-center">
				<h3 className="text-blackColor font-semibold text-[22px] sm:text-[26px] lg:text-[34px] leading-none">
					{fullName || 'Doctor'}
				</h3>
				{doctor.title ? (
					<p className="mt-2 text-grayColor text-[16px] sm:text-[18px] lg:text-[20px] leading-none">
						{doctor.title}
					</p>
				) : null}
				{specialty ? (
					<p className="mt-2 text-grayColor text-[12px] sm:text-[13px] lg:text-[14px] leading-none">
						{specialty}
					</p>
				) : null}
			</div>
		</div>
	);
}

export default function MeetTeamSection() {
	const { data, isLoading, isError } = useDoctors();
	const { t } = useLanguage();
	const doctors = useMemo(() => ((data ?? []) as Doctor[]), [data]);
	const [activeIndex, setActiveIndex] = useState(0);

	const hasMany = doctors.length > 1;

	const goPrev = () => {
		if (!doctors.length) return;
		setActiveIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
	};
	const goNext = () => {
		if (!doctors.length) return;
		setActiveIndex((prev) => (prev + 1) % doctors.length);
	};

	if (isLoading) {
		return (
			<section className="bg-background py-12 sm:py-16 lg:py-20 px-4">
				<div className="mx-auto max-w-6xl text-center">
					<div className="text-lg text-grayColor">{t('team.loading')}</div>
				</div>
			</section>
		);
	}

	if (isError) {
		return (
			<section className="bg-background py-12 sm:py-16 lg:py-20 px-4">
				<div className="mx-auto max-w-6xl text-center">
					<div className="text-lg text-grayColor">{t('team.error')}</div>
				</div>
			</section>
		);
	}

	if (!doctors.length) return null;

	return (
		<section className="bg-background py-12 sm:py-16 lg:py-20">
			<div className="page-container">
				<div className="text-center">
					<SectionTitle
						greenText={t('team.title.green')}
						blackText={t('team.title.black')}
						description={t('team.description')}
						titleClassName="text-3xl sm:text-4xl lg:text-[42px] font-semibold"
						descriptionClassName="mx-auto mt-3 max-w-3xl text-sm sm:text-base lg:text-lg text-grayColor"
					/>
				</div>

				{/* Mobile/Tablet: manual switch (no auto sliding) */}
				<div className="mt-10 lg:hidden">
					<div className="flex items-center justify-center">
						<DoctorCard doctor={doctors[activeIndex]} fetchPriority="high" />
					</div>

					{hasMany ? (
						<div className="mt-6 flex items-center justify-center gap-6">
							<button
								type="button"
								onClick={goPrev}
								className="h-10 w-10 rounded-full flex items-center justify-center text-blackColor"
								aria-label={t('team.prev')}
							>
								<MdKeyboardArrowRight className="text-2xl rotate-180" />
							</button>
							<button
								type="button"
								onClick={goNext}
								className="h-10 w-10 rounded-full flex items-center justify-center text-blackColor"
								aria-label={t('team.next')}
							>
								<MdKeyboardArrowRight className="text-2xl" />
							</button>
						</div>
					) : null}
				</div>

				{/* Desktop (lg+): auto right-to-left slide */}
				<div className="mt-10 hidden lg:block">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 justify-items-center">
						{doctors.map((doctor, idx) => (
							<DoctorCard key={String(doctor.id)} doctor={doctor} fetchPriority={idx < 2 ? 'high' : 'auto'} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
