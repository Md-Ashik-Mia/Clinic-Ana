'use client';

/* eslint-disable @next/next/no-img-element */

import SectionTitle from '@/components/shared/SectionTitle';
import { useDoctors } from '@/hooks/useDoctors';
import { useLanguage } from '@/hooks/useLanguage';
import axiosInstance from '@/lib/axiosInstance';
import type { Doctor } from '@/types/doctor';
import { useMemo, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

function resolvePhotoUrl(photo: string | null | undefined) {
	if (!photo) return '';
	if (photo.startsWith('http://') || photo.startsWith('https://')) return photo;

	const base =
		typeof axiosInstance?.defaults?.baseURL === 'string' ? axiosInstance.defaults.baseURL : '';
	if (!base) return photo;
	return `${base}${photo.startsWith('/') ? '' : '/'}${photo}`;
}

function DoctorCard({ doctor }: { doctor: Doctor }) {
	const fullName = `${doctor.first_name ?? ''} ${doctor.last_name ?? ''}`.trim();
	const specialty = doctor.specialties?.[0]?.name;
	const photoUrl = resolvePhotoUrl(doctor.photo);

	return (
		<div className="shrink-0 w-75.5">
			<div className="w-75.5 h-75.5 overflow-hidden rounded-xl">
				{photoUrl ? (
					<img
						src={photoUrl}
						alt={fullName || 'Doctor'}
						className="h-full w-full object-cover"
						loading="lazy"
					/>
				) : (
					<div className="h-full w-full bg-secondary" />
				)}
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
	const loopItems = useMemo(() => (hasMany ? [...doctors, ...doctors] : doctors), [doctors, hasMany]);
	const durationSeconds = Math.max(18, doctors.length * 6);

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
		<section className="bg-background py-12 sm:py-16 lg:py-20 px-4">
			<div className="mx-auto container">
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
						<DoctorCard doctor={doctors[activeIndex]} />
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
				<div className="mt-10 hidden lg:block overflow-hidden">
					<div
						className={
							hasMany
								? 'clinic-marquee-track flex w-max gap-8'
								: 'flex flex-wrap justify-center gap-8'
						}
						style={
							hasMany
								? ({ animationDuration: `${durationSeconds}s` } as React.CSSProperties)
								: undefined
						}
					>
						{loopItems.map((doctor, idx) => (
							<DoctorCard key={`${doctor.id}-${idx}`} doctor={doctor} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
