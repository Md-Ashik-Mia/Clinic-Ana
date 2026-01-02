/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';

import SectionTitle from '@/components/shared/SectionTitle';
import { useLanguage } from '@/hooks/useLanguage';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { RiDoubleQuotesL } from 'react-icons/ri';

import { useReviews } from '../../hooks/useReviews';
import axiosInstance from '../../lib/axiosInstance';
import type { Review } from '../../types/review';

function Stars({ count }: { count: number }) {
	const safeCount = Math.max(0, Math.min(5, count));
	return (
		<div className="flex items-center justify-center gap-1">
			{Array.from({ length: safeCount }).map((_, i) => (
				<span key={i} className="text-[#F28C28] text-2xl leading-none">★</span>
			))}
		</div>
	);
}

function resolvePhotoUrl(photo: string | null | undefined) {
	if (!photo) return '';
	if (photo.startsWith('http://') || photo.startsWith('https://')) return photo;

	const base = typeof axiosInstance?.defaults?.baseURL === 'string' ? axiosInstance.defaults.baseURL : '';
	if (!base) return photo;
	return `${base}${photo.startsWith('/') ? '' : '/'}${photo}`;
}

function initialsFromName(name: string) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	const first = parts[0]?.[0] ?? '';
	const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
	return `${first}${last}`.toUpperCase();
}

export default function TestimonialsPreview() {
	const { t } = useLanguage();
	const { data, isLoading, isError } = useReviews();
	const all = (data ?? []) as Review[];
	const withComment = all.filter((r) => (r?.comment ?? '').trim().length > 0);
	const items = withComment.length > 0 ? withComment : all;

	const railRef = useRef<HTMLDivElement | null>(null);
	const rafRef = useRef<number | null>(null);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const el = railRef.current;
		if (!el) return;

		const update = () => {
			const max = el.scrollWidth - el.clientWidth;
			if (max <= 0) {
				setProgress(1);
				return;
			}
			setProgress(Math.max(0, Math.min(1, el.scrollLeft / max)));
		};

		const onScroll = () => {
			if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
			rafRef.current = requestAnimationFrame(() => {
				rafRef.current = null;
				update();
			});
		};

		update();
		el.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', update);
		return () => {
			if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
			el.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', update);
		};
	}, [items.length]);

	const scrollBy = (dir: 'left' | 'right') => {
		const el = railRef.current;
		if (!el) return;
		const amount = Math.round(el.clientWidth * 0.75);
		el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
	};

	return (
		<section className="bg-background py-12 sm:py-16 lg:py-20 px-4">
			<div className="mx-auto max-w-6xl">
				<div className="text-center">
					<SectionTitle
						greenText={t('home.testimonialsPreview.title')}
						blackText=""
						description={
							<>
								{t('home.testimonialsPreview.descriptionLine1')}
								{' '}
								{t('home.testimonialsPreview.descriptionLine2')}
							</>
						}
					/>
				</div>

				<div className="mt-10 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 items-center">
					{/* Left block */}
					<div className="relative">
						<div className="text-[#525252] leading-none text-center">
							<RiDoubleQuotesL className="inline-block" style={{ width: 144.14, height: 110.55 }} />
						</div>
						<div className="-mt-6">
							<p className="text-grayColor text-2xl text-center">{t('home.testimonialsPreview.hearFrom')}</p>
							<h3 className="textHeading-color text-[52px] font-semibold leading-none text-center">{t('home.testimonialsPreview.ourPatients')}</h3>
						</div>

						<div className="mt-6 flex items-center gap-4">
							<button
								type="button"
								onClick={() => scrollBy('left')}
								className="icon-interactive h-10 w-10 rounded-full flex items-center justify-center text-blackColor"
								aria-label={t('home.testimonialsPreview.scrollLeftAria')}
							>
								<MdKeyboardArrowRight className="text-2xl rotate-180" />
							</button>
							<div className="relative h-0.5 flex-1 bg-black/15 rounded-full overflow-hidden">
								<div
									className="absolute inset-y-0 left-0 bg-[#525252] transition-[width] duration-300"
									style={{ width: `${Math.round(progress * 100)}%` }}
								/>
							</div>
							<button
								type="button"
								onClick={() => scrollBy('right')}
								className="icon-interactive h-10 w-10 rounded-full flex items-center justify-center text-blackColor"
								aria-label={t('home.testimonialsPreview.scrollRightAria')}
							>
								<MdKeyboardArrowRight className="text-2xl" />
							</button>
						</div>
					</div>

					{/* Card rail */}
					<div
						id="testimonial-rail"
						ref={railRef}
						className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none]"
					>
						<style>{`#testimonial-rail::-webkit-scrollbar{display:none;}`}</style>

						{isLoading ? (
							<div className="text-grayColor text-base">{t('home.testimonialsPreview.loading')}</div>
						) : isError ? (
							<div className="text-grayColor text-base">{t('home.testimonialsPreview.error')}</div>
						) : (
							items.map((r) => {
								const comment = (r.comment ?? '').trim();
								const name = (r.name ?? t('home.testimonialsPreview.patientFallback')).trim() || t('home.testimonialsPreview.patientFallback');
								const rating = Number(r.rating ?? 0);
								const avatar = resolvePhotoUrl(r.photo);

								return (
									<div key={String(r.id)} className="shrink-0 w-75.5">
										<div
											className="relative rounded-3xl bg-[#E6F6F4] px-8 pt-8 pb-10 shadow-sm ring-black/5"
										>
											{/* Tail (rectangle + triangle) */}
											<div aria-hidden="true" className="absolute left-0 bottom-0">
												{/* subtle shadow/ring underlay */}
												<div className="absolute -left-0.5 bottom-0 w-23.75 h-26.75">
													{/* <div className="absolute left-0 bottom-0 w-6 h-12 bg-[#E6F6F4] shadow-sm ring-1 ring-black/5 rounded-sm" /> */}
													<div className="absolute left-0 -bottom-14 w-23.75 h-26.75 bg-[#E6F6F4] shadow-sm ring-1 ring-black/5 [clip-path:polygon(0%_0%,100%_0%,0%_100%)] rounded-[2px]" />
												</div>
											</div>

											<p className="text-base text-grayColor leading-5.75 tracking-[0.02em] min-h-28.75">
												{comment}
											</p>

											<div className="mt-8">
												<Stars count={rating} />
											</div>
										</div>

										<div className="mt-6 ml-8 flex items-center gap-4">
											<div className="h-16 w-16 rounded-full overflow-hidden bg-black/10 flex items-center justify-center ring-1 ring-black/5">
												{avatar ? (
													<img
														src={avatar}
														alt={name}
														className="h-full w-full object-cover"
														loading="lazy"
													/>
												) : (
													<span className="text-grayColor font-semibold">{initialsFromName(name)}</span>
												)}
											</div>

											<div>
												<div className="text-[26px] font-semibold text-blackColor leading-none">{name}</div>
												<div className="text-sm text-grayColor leading-none mt-1">{t('home.testimonialsPreview.patientLabel')}</div>
											</div>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

