/* eslint-disable @next/next/no-img-element */

'use client';

import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

import { useClinicInfo } from '@/hooks/useClinicInfo';
import { useWorkingHours } from '@/hooks/useWorkingHours';

type WorkingHour = {
	id: number | string;
	start_time?: string | null;
	end_time?: string | null;
	days?: string | null;
	closed_days?: string | null;
};

function formatTimeForDisplay(time: string | null | undefined, separator: ':' | '.'): string {
	if (!time || typeof time !== 'string') return '';
	const [hhRaw, mmRaw] = time.split(':');
	const hours = String(parseInt(hhRaw ?? '0', 10));
	const minutes = String(parseInt(mmRaw ?? '0', 10)).padStart(2, '0');
	return `${hours}${separator}${minutes}`;
}

function normalizeDayLabel(days: string | null | undefined, closedDays: string | null | undefined): string {
	const label = (days || closedDays || '').trim();
	if (!label) return 'No specific days';

	const map: Record<string, string> = {
		Monday: 'Mon',
		Tuesday: 'Tue',
		Wednesday: 'Wed',
		Thursday: 'Thu',
		Friday: 'Fri',
		Saturday: 'Sat',
		Sunday: 'Sun',
	};

	const rangeMatch = label.match(/^([A-Za-z]+)\s*-\s*([A-Za-z]+)$/);
	if (rangeMatch) {
		const fromKey = rangeMatch[1];
		const toKey = rangeMatch[2];
		const from = map[fromKey] ?? fromKey;
		const to = map[toKey] ?? toKey;
		return `${from}-${to}`;
	}

	return map[label] ?? label;
}

export default function Footer() {
	const { data: clinicInfo } = useClinicInfo();
	const { data: workingHours } = useWorkingHours();

	const primaryEmail = clinicInfo?.emails?.[0] ?? '';
	const primaryPhone = clinicInfo?.phone_numbers?.[0] ?? '';
	const location = clinicInfo?.location ?? '';

	const socials = [
		{ key: 'instagram', href: clinicInfo?.instagram_link, icon: <FaInstagram className="h-6 w-6" />, label: 'Instagram' },
		{ key: 'facebook', href: clinicInfo?.facebook_link, icon: <FaFacebookF className="h-6 w-6" />, label: 'Facebook' },
		{ key: 'youtube', href: undefined, icon: <FaYoutube className="h-6 w-6" />, label: 'YouTube' },
		{ key: 'linkedin', href: clinicInfo?.linkedin_link, icon: <FaLinkedinIn className="h-6 w-6" />, label: 'LinkedIn' },
	];

	const items = (workingHours ?? []) as WorkingHour[];
	const timeItems = items.slice(0, 4).map((item) => {
		const label = normalizeDayLabel(item?.days, item?.closed_days);
		const isClosed = Boolean(item?.closed_days) || !item?.start_time || !item?.end_time;
		const start = formatTimeForDisplay(item?.start_time, ':');
		const end = formatTimeForDisplay(item?.end_time, '.');
		const timeText = isClosed ? '(Closed)' : `(${start}-${end})`;
		return { id: item.id, label, timeText };
	});

	return (
		<footer className="bg-[#E6F6F4] px-4 py-12">
			<div className="mx-auto container">
				<div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr] gap-10 lg:gap-14">
					{/* Left */}
					<div>
						<img src="/images/logo/logo.png" alt="Clinic logo" className="h-23 w-auto" />
						<p className="mt-4 max-w-81.5 text-[16px] leading-tight text-[#003B33]">
							We provide expert physiotherapy care to help you recover, stay active, and live a pain-free life. Your health and
							well-being are our top priority.
						</p>

						<div className="mt-6 flex items-center gap-4 text-black">
							{socials
								.filter((s) => Boolean(s.href))
								.map((s) => (
									<a
										key={s.key}
										href={s.href as string}
										target="_blank"
										rel="noreferrer"
										aria-label={s.label}
										className="icon-interactive inline-flex h-6 w-6 items-center justify-center"
									>
										{s.icon}
									</a>
								))}
						</div>

						<div className="mt-7 space-y-3 text-blackColor">
							<div className="flex items-start gap-3">
								<MdLocationOn className="mt-0.5 h-5 w-5 text-grayColor" />
								<span className="text-[18px] leading-none">{location || '-'}</span>
							</div>
							<div className="flex items-center gap-3">
								<MdPhone className="h-5 w-5 text-grayColor" />
								<span className="text-[18px] leading-none">{primaryPhone || '-'}</span>
							</div>
							<div className="flex items-center gap-3">
								<MdEmail className="h-5 w-5 text-grayColor" />
								<span className="text-[18px] leading-none">{primaryEmail || '-'}</span>
							</div>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-[22px] font-medium leading-none text-blackColor">Quick Links</h4>
						<ul className="mt-5 space-y-3">
							{[
								{ label: 'Home', href: '/' },
								{ label: 'About us', href: '/about' },
								{ label: 'Services', href: '/services' },
								{ label: 'Testimonials', href: '/testimonials' },
								{ label: 'Contact', href: '/contact' },
							].map((t) => (
								<li key={t.href}>
									<Link href={t.href} className="text-[18px] text-grayColor underline underline-offset-4">
										{t.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Service */}
					<div>
						<h4 className="text-[22px] font-medium leading-none text-blackColor">Service</h4>
						<ul className="mt-5 space-y-3 text-[18px] text-grayColor">
							<li>Sports Injury Rehabilitation</li>
							<li>Post-Surgical Therapy</li>
							<li>Pain Management Therapy</li>
							<li>Neurological Rehabilitation</li>
							<li>Orthopedic Rehabilitation</li>
							<li>Pediatric &amp; Geriatric Therapy</li>
						</ul>
					</div>

					{/* Time */}
					<div>
						<h4 className="text-[22px] font-medium leading-none text-blackColor">Time</h4>
						<ul className="mt-5 space-y-3 text-[18px] text-grayColor">
							{timeItems.length ? (
								timeItems.map((t) => (
									<li key={String(t.id)}>
										<div>{t.label}</div>
										<div className="mt-1 text-sm text-grayColor">{t.timeText}</div>
									</li>
								))
							) : (
								<li>-</li>
							)}
						</ul>
					</div>
				</div>

				<div className="mt-12 text-blackColor text-sm">
					© 2024 Clinic Name | Privacy Policy | Terms of Service
				</div>
			</div>
		</footer>
	);
}

