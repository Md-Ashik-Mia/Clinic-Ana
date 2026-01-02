"use client";

import { useLanguage, type Language } from "@/hooks/useLanguage";

type Props = {
	className?: string;
};

const LANGS: Array<{ code: Language; label: string }> = [
	{ code: "en", label: "EN" },
	{ code: "es", label: "ES" },
];

export default function LanguageSwitcher({ className }: Props) {
	const { language, setLanguage } = useLanguage();

	return (
		<div
			className={[
				"inline-flex items-center ", // 10px
				className ?? "",
			].join(" ")}
			role="group"
			aria-label="Language"
		>
			{LANGS.map(({ code, label }) => {
				const selected = code === language;
				return (
					<button
						key={code}
						type="button"
						onClick={() => setLanguage(code)}
						aria-pressed={selected}
						className={[
							"inline-flex h-5.75 items-center text-[14px] font-semibold leading-none",
							"transition-colors duration-200",
							selected
								? "rounded-[20px]  px-2 py-0.5 text-white bg-[#007F6D]  "
								: "text-blackColor bg-[#D9F2EF] px-2 py-0.5 rounded-2xl",
						].join(" ")}
					>
						{label}
					</button>
				);
			})}
		</div>
	);
}

