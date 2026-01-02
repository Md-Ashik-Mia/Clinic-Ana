/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';

import SectionTitle from '@/components/shared/SectionTitle';
import { useLanguage } from '@/hooks/useLanguage';

type Feature = {
	title: string;
	description: string;
	imageSrc?: string;
};

function FeatureImage({ src, alt }: { src?: string; alt: string }) {
	if (!src) {
		return <div className="h-25 w-25 rounded-full bg-blackColor/10" aria-hidden="true" />;
	}

	return (
		<img
			src={src}
			alt={alt}
			className="h-25 w-25 rounded-full object-cover"
			loading="lazy"
		/>
	);
}

export default function WhyChooseUs() {
	const { t } = useLanguage();

	const FEATURES: Feature[] = [
		{
			title: t('home.whyChooseUs.features.expertTherapists.title'),
			description: t('home.whyChooseUs.features.expertTherapists.description'),
			imageSrc: '/images/home/whychooseus/img1.png',
		},
		{
			title: t('home.whyChooseUs.features.personalizedCare.title'),
			description: t('home.whyChooseUs.features.personalizedCare.description'),
			imageSrc: '/images/home/whychooseus/img2.png',
		},
		{
			title: t('home.whyChooseUs.features.modernTechniques.title'),
			description: t('home.whyChooseUs.features.modernTechniques.description'),
			imageSrc: '/images/home/whychooseus/img3.png',
		},
		{
			title: t('home.whyChooseUs.features.friendlyEnvironment.title'),
			description: t('home.whyChooseUs.features.friendlyEnvironment.description'),
			imageSrc: '/images/home/whychooseus/img4.png',
		},
	];

	return (
		<section className="bg-background py-12 sm:py-16 lg:py-20 px-4">
			<div className="mx-auto max-w-6xl text-center">
				<SectionTitle
					className="mb-10"
					greenText={t('home.whyChooseUs.titleGreen')}
					blackText={t('home.whyChooseUs.titleBlack')}
					description={
						<>
							{t('home.whyChooseUs.descriptionLine1')}
							{' '}
							{t('home.whyChooseUs.descriptionLine2')}
						</>
					}
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
					{FEATURES.map((feature) => (
						<div
							key={feature.title}
							className="w-75.5 h-75.5 rounded-md bg-[#E6F6F4] px-6 py-8 flex flex-col items-center justify-start"
						>
							<FeatureImage src={feature.imageSrc} alt={feature.title} />

							<h3 className="mt-6 text-[26px] font-semibold oceanGreen-color text-center leading-none">
								{feature.title}
							</h3>
							<p className="mt-4 text-sm text-grayColor text-center leading-none">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

