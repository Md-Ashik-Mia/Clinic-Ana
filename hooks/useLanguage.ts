"use client";

import {
    createContext,
    createElement,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

export type Language = "en" | "es";

type TranslationKey =
	| "nav.home"
	| "nav.services"
	| "nav.about"
	| "nav.testimonials"
	| "nav.contact"
	| "action.bookWhatsApp";

const STORAGE_KEY = "clinic_language";

const translations: Record<Language, Record<TranslationKey, string>> = {
	en: {
		"nav.home": "Home",
		"nav.services": "Services",
		"nav.about": "About us",
		"nav.testimonials": "Testimonials",
		"nav.contact": "Contact",
		"action.bookWhatsApp": "Book on WhatsApp",
	},
	es: {
		"nav.home": "Inicio",
		"nav.services": "Servicios",
		"nav.about": "Sobre nosotros",
		"nav.testimonials": "Testimonios",
		"nav.contact": "Contacto",
		"action.bookWhatsApp": "Reservar por WhatsApp",
	},
};

type LanguageContextValue = {
	language: Language;
	setLanguage: (language: Language) => void;
	t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: unknown): value is Language {
	return value === "en" || value === "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [language, setLanguageState] = useState<Language>("en");

	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(STORAGE_KEY);
			if (stored && isLanguage(stored)) {
				setLanguageState(stored);
			}
		} catch {
			// ignore
		}
	}, []);

	useEffect(() => {
		try {
			window.localStorage.setItem(STORAGE_KEY, language);
		} catch {
			// ignore
		}
		if (typeof document !== "undefined") {
			document.documentElement.lang = language;
		}
	}, [language]);

	const setLanguage = useCallback((next: Language) => {
		setLanguageState(next);
	}, []);

	const t = useCallback(
		(key: TranslationKey) => translations[language][key] ?? key,
		[language]
	);

	const value = useMemo(
		() => ({ language, setLanguage, t }),
		[language, setLanguage, t]
	);

	return createElement(LanguageContext.Provider, { value }, children);
}

export function useLanguage() {
	const ctx = useContext(LanguageContext);
	if (!ctx) {
		throw new Error("useLanguage must be used within <LanguageProvider />");
	}
	return ctx;
}

