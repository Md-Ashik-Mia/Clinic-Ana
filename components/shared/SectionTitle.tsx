import React from 'react';

type SectionTitleProps = {
	greenText: React.ReactNode;
	blackText: React.ReactNode;
	description?: React.ReactNode;
	className?: string;
	titleClassName?: string;
	descriptionClassName?: string;
};

export default function SectionTitle({
	greenText,
	blackText,
	description,
	className = '',
	titleClassName = 'text-3xl sm:text-4xl lg:text-[42px] font-semibold',
	descriptionClassName = 'mx-auto mt-4 max-w-3xl text-sm sm:text-base lg:text-lg text-grayColor',
}: SectionTitleProps) {
	return (
		<div className={className}>
			<h2 className={titleClassName}>
				<span className="oceanGreen-color">{greenText}</span>
				<span className="text-blackColor">{blackText}</span>
			</h2>

			{description ? (
				<p className={descriptionClassName}>{description}</p>
			) : null}
		</div>
	);
}
