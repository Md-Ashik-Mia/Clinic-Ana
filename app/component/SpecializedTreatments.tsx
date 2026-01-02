/* eslint-disable @next/next/no-img-element */
'use client';

import SectionTitle from '@/components/shared/SectionTitle';
import { useTreatments } from '../../hooks/useTreatments';
import type { Treatment } from '../../types/treatment';

export default function SpecializedTreatments() {
	const { data, isLoading, isError } = useTreatments();
	const items = ((data ?? []) as Treatment[]).filter((t) => Boolean(t?.special));

	if (isLoading) {
		return (
			<section className="bg-background py-16 px-4">
				<div className="mx-auto max-w-6xl text-center">
					<div className="text-lg text-grayColor">Loading treatments...</div>
				</div>
			</section>
		);
	}

	if (isError) {
		return (
			<section className="bg-background py-16 px-4">
				<div className="mx-auto max-w-6xl text-center">
					<div className="text-lg text-grayColor">Failed to load treatments.</div>
				</div>
			</section>
		);
	}

	return (
		<section className="bg-background py-12 sm:py-16 lg:py-20 px-4">
			<div className="mx-auto max-w-6xl text-center">
				<SectionTitle
					className="mb-8 sm:mb-10 lg:mb-12"
					greenText="Specialized "
					blackText="Treatments"
					description={
						<>
							We offer advanced therapy solutions tailored to your specific needs and health goals.
							From injury rehabilitation to chronic pain relief, each treatment is focused on long-term wellness
						</>
					}
					titleClassName="text-3xl sm:text-4xl lg:text-[42px] font-semibold"
					descriptionClassName="mx-auto mt-3 max-w-3xl text-sm sm:text-base lg:text-lg text-grayColor"
				/>

				<div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{items.map((treatment) => (
						<div key={treatment.id} className="text-left max-w-sm mx-auto w-full">
							<div className="overflow-hidden rounded-md bg-white">
								<img
									src={treatment.photo ?? ''}
									alt={treatment.name_eng ?? 'Treatment'}
									className="h-56 sm:h-64 lg:h-75.5 w-full object-cover"
									loading="lazy"
								/>
							</div>

							<h3 className="mt-4 text-lg sm:text-xl lg:text-[22px] font-semibold text-blackColor text-center">
								{treatment.name_eng}
							</h3>
							<p className="mt-2 text-sm sm:text-base text-grayColor text-center">
								{treatment.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
