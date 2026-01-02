'use client';

/* eslint-disable @next/next/no-img-element */

import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { useReviews } from '@/hooks/useReviews';
import axiosInstance from '@/lib/axiosInstance';
import type { Review } from '@/types/review';

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

function StarsRow({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
	return (
		<div className="flex items-center gap-3">
			{Array.from({ length: 5 }).map((_, idx) => {
				const star = idx + 1;
				const filled = star <= value;
				return (
					<button
						key={star}
						type="button"
						onClick={onChange ? () => onChange(star) : undefined}
						className="leading-none"
						aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
					>
						<span className={filled ? 'text-[#F28C28] text-xl' : 'text-black/50 text-xl'}>
							★
						</span>
					</button>
				);
			})}
		</div>
	);
}

function ReviewItem({ review }: { review: Review }) {
	const name = (review.name ?? 'Patient').trim() || 'Patient';
	const comment = (review.comment ?? '').trim();
	const rating = Number(review.rating ?? 0);
	const avatar = resolvePhotoUrl(review.photo);

	return (
		<div className="w-full rounded-xl bg-[#D9F2EF] px-4 py-3 flex items-start gap-4">
			<div className="h-12 w-12 rounded-full overflow-hidden bg-black/10 flex items-center justify-center shrink-0">
				{avatar ? (
					<img src={avatar} alt={name} className="h-full w-full object-cover" loading="lazy" />
				) : (
					<span className="text-grayColor font-semibold text-sm">{initialsFromName(name)}</span>
				)}
			</div>

			<div className="min-w-0 flex-1">
				<div className="flex items-start justify-between gap-3">
					<div className="text-blackColor font-medium text-[18px] leading-none truncate">{name}</div>
					<div className="flex items-center gap-1 shrink-0">
						{Array.from({ length: 5 }).map((_, i) => (
							<span key={i} className={i < rating ? 'text-[#F28C28] text-sm' : 'text-black/15 text-sm'}>
								★
							</span>
						))}
					</div>
				</div>
				<p className="mt-2 text-grayColor text-[14px] leading-[1.2] line-clamp-3">
					{comment || '—'}
				</p>
			</div>
		</div>
	);
}

type ReviewFormState = {
	name: string;
	email: string;
	comment: string;
	rating: number;
	file: File | null;
};

const INPUT_BG = '#D9F2EF';

export default function TestimonialsSection() {
	const { data, isLoading, isError, refetch } = useReviews();
	const reviews = useMemo(() => (data ?? []) as Review[], [data]);
	const list = reviews.filter((r) => (r?.comment ?? '').trim().length > 0);

	const [form, setForm] = useState<ReviewFormState>({
		name: '',
		email: '',
		comment: '',
		rating: 0,
		file: null,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const onCancel = () => {
		setForm({ name: '', email: '', comment: '', rating: 0, file: null });
		if (fileInputRef.current) fileInputRef.current.value = '';
	};

	const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0] ?? null;
		setForm((p) => ({ ...p, file: f }));
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isSubmitting) return;

		const name = form.name.trim();
		const email = form.email.trim();
		const comment = form.comment.trim();

		if (!name || !email || !comment || form.rating <= 0) {
			toast.error('Please fill all required fields and select rating.', { position: 'top-center', autoClose: 3000 });
			return;
		}

		setIsSubmitting(true);
		try {
			const fd = new FormData();
			// API expects multipart/form-data
			fd.append('name', name);
			fd.append('email', email);
			fd.append('comment', comment);
			fd.append('rating', String(form.rating));
			// API uses `photo` for uploaded image
			if (form.file) fd.append('photo', form.file);

			await axiosInstance.post('/reviews/rating/', fd);

			toast.success('Review submitted successfully.', { position: 'top-center', autoClose: 3000 });
			onCancel();
			await refetch();
		} catch {
			toast.error('Failed to submit review. Please try again.', { position: 'top-center', autoClose: 3500 });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="pb-16 px-4">
			<ToastContainer />
			<div className="mx-auto w-full max-w-265.25 rounded-xl bg-[#E6F6F4] px-4 sm:px-10 py-5">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-25">
					{/* Left: Recent Feedbacks */}
					<div>
						<h3 className="text-blackColor font-semibold text-[22px] sm:text-[24px] lg:text-[26px] leading-none">
							Recent Feedbacks
						</h3>

						<div className="mt-6 space-y-4 max-h-130 overflow-y-auto pr-1">
							{isLoading ? (
								<div className="text-grayColor">Loading reviews...</div>
							) : isError ? (
								<div className="text-grayColor">Failed to load reviews.</div>
							) : list.length ? (
								list.map((r) => <ReviewItem key={String(r.id)} review={r} />)
							) : (
								<div className="text-grayColor">No reviews yet.</div>
							)}
						</div>
					</div>

					{/* Right: Add a Review */}
					<div>
						<h3 className="text-blackColor font-semibold text-[24px] sm:text-[26px] leading-none">Add a Review</h3>

						<form onSubmit={onSubmit} className="mt-6">
							<label className="block text-grayColor text-[14px] sm:text-[16px] font-medium">
								Add Your Rating
							</label>
							<div className="mt-3">
								<StarsRow value={form.rating} onChange={(v) => setForm((p) => ({ ...p, rating: v }))} />
							</div>

							<div className="mt-7">
								<label className="block text-blackColor text-[20px] sm:text-[20px] font-medium">
									Name<span className="text-red-500">*</span>
								</label>
								<input
									value={form.name}
									onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
									className="mt-2 w-full h-11.5 rounded-xl px-4 text-blackColor border border-transparent border-b-2 border-b-[#525252] outline-none"
									style={{ backgroundColor: INPUT_BG }}
									placeholder=""
								/>
							</div>

							<div className="mt-6">
								<label className="block text-blackColor text-[20px] sm:text-[20px] font-medium">
									Email<span className="text-red-500">*</span>
								</label>
								<input
									type="email"
									value={form.email}
									onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
									className="mt-2 w-full h-11.5 rounded-xl px-4 text-blackColor border border-transparent border-b-2 border-b-[#525252] outline-none"
									style={{ backgroundColor: INPUT_BG }}
									placeholder=""
								/>
							</div>

							<div className="mt-6">
								<label className="block text-blackColor text-[20px] sm:text-[20px] font-medium">
									Write Your Message<span className="text-red-500">*</span>
								</label>
								<textarea
									value={form.comment}
									onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
									className="mt-2 w-full min-h-40 rounded-xl px-4 py-3 text-blackColor border border-transparent border-b-2 border-b-[#525252] outline-none resize-none"
									style={{ backgroundColor: INPUT_BG }}
									placeholder=""
								/>
							</div>

							<div className="mt-6">
								<div className="text-blackColor text-[18px] sm:text-[20px] font-medium leading-none">
									Media Upload <span className="text-grayColor text-[16px] font-normal">(optional)</span>
								</div>

								<div className="mt-3 rounded-xl border-b-2 border-b-[#525252] px-8 py-6 text-center" style={{ backgroundColor: INPUT_BG }}>
									<div className="text-blackColor text-[14px] font-normal">Drag your file to start uploading</div>
									<div className="text-blackColor text-[14px] font-normal mt-2">or</div>

									<input
										ref={fileInputRef}
										type="file"
										accept=".jpg,.jpeg,.png,.zip"
										onChange={onFileChange}
										className="hidden"
									/>
									<button
										type="button"
										onClick={() => fileInputRef.current?.click()}
										className="btn-interactive mt-3 inline-flex h-10.5 items-center justify-center rounded-[20px] border border-primary px-8 py-1.5 text-[14px] font-normal text-[#00A991]"
									>
										Browse Files
									</button>

									{form.file ? (
										<div className="mt-3 text-grayColor text-[12px] truncate">Selected: {form.file.name}</div>
									) : null}
								</div>
								<div className="mt-3 text-grayColor text-[14px] font-normal">
									Only support - jpg, png and zip files.
								</div>
							</div>

							<div className="mt-6 flex items-center justify-center gap-6 sm:justify-start">
								<button
									type="submit"
									disabled={isSubmitting}
									className="btn-interactive h-10.5 rounded-[20px] px-8 bg-[#00A991] text-white disabled:opacity-60"
								>
									Submit Now
								</button>
								<button
									type="button"
									onClick={onCancel}
									className="btn-interactive h-10.5 rounded-[20px] px-8 border border-black/70 text-blackColor"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
