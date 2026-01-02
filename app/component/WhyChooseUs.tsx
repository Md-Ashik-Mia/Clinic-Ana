/* eslint-disable @next/next/no-img-element */
import SectionTitle from '@/components/shared/SectionTitle';

type Feature = {
	title: string;
	description: string;
	imageSrc?: string;
};

const FEATURES: Feature[] = [
	{
		title: 'Expert Therapists',
		description:
			'Highly trained and certified physiotherapists dedicated to accurate diagnosis and effective treatment.',
		imageSrc: '/images/home/whychooseus/img1.png',
	},
	{
		title: 'Personalized Care',
		description:
			'Every treatment plan is tailored to your condition, goals, and lifestyle for maximum recovery.',
		imageSrc: '/images/home/whychooseus/img2.png',
	},
	{
		title: 'Modern Techniques',
		description:
			'We use advanced physiotherapy methods and up-to-date clinical practices for better results.',
		imageSrc: '/images/home/whychooseus/img3.png',
	},
	{
		title: 'Friendly Environment',
		description:
			'Experience compassionate care in a calm and welcoming clinic that prioritizes your comfort.',
		imageSrc: '/images/home/whychooseus/img4.png',
	},
];

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
	return (
		<section className="bg-background py-12 sm:py-16 lg:py-20 px-4">
			<div className="mx-auto max-w-6xl text-center">
				<SectionTitle
					className="mb-10"
					greenText="Why "
					blackText="Choose Us"
					description={
						<>
							With a patient-centered approach and evidence-based therapy, we deliver care that truly makes a difference.
							From accurate assessment to ongoing support, we guide you through every step of your healing journey.
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

