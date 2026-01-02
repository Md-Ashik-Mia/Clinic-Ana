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

type TranslationKey = string;

const STORAGE_KEY = "clinic_language";

const translations: Record<Language, Record<TranslationKey, string>> = {
	en: {
		"nav.home": "Home",
		"nav.services": "Services",
		"nav.about": "About us",
		"nav.testimonials": "Testimonials",
		"nav.contact": "Contact",
		"action.bookWhatsApp": "Book on WhatsApp",

		"lang.en": "EN",
		"lang.es": "ES",

		"page.contact.title": "Contact Our Physiotherapy Team",
		"page.contact.description": "Have questions about your recovery or our treatments? Send us a message and our team will respond promptly to guide you.",
		"page.services.title": "Comprehensive Physiotherapy Care",
		"page.services.description": "From injury rehabilitation to pain management, our services are tailored to meet your individual health needs.",
		"page.testimonials.title": "What Our Patient Say",
		"page.testimonials.description": "Hear real stories from patients who regained strength, mobility, and confidence through our care.",
		"page.about.title1": "Dedicated to Your Recovery",
		"page.about.desc1": "Our clinic combines experienced therapists, modern techniques, and compassionate care to support your full recovery journey.",
		"page.about.title2": "Physiotherapy Care",
		"page.about.desc2": "Our hospital is dedicated to delivering high-quality physiotherapy services in a safe and professional environment. With modern facilities and patient-focused care, we aim to support recovery, improve mobility, and enhance overall quality of life for every individual we serve.",
		"page.about.title3": "Care for Every Patient",
		"page.about.desc3": "We provide personalized treatment plans, flexible appointment options, and continuous guidance throughout the recovery process. Our goal is to ensure each patient feels supported, informed, and confident at every stage of their therapy journey.",
		"page.about.title4": "Physiotherapy Specialists",
		"page.about.desc4": "Our team consists of experienced and certified physiotherapists who specialize in various rehabilitation and pain management techniques. We are committed to delivering the highest standard of care, tailored to individual needs.",

		"about.highlight.trusted": "Trusted",
		"about.highlight.focused": "Focused",
		"about.highlight.meetOur": "Meet Our",
		"team.title.green": "Meet",
		"team.title.black": " the Team",
		"team.description": "Our experienced physiotherapists are dedicated to providing personalized care and effective treatment for every patient.",
		"team.prev": "Previous doctor",
		"team.next": "Next doctor",
		"team.loading": "Loading doctors...",
		"team.error": "Failed to load doctors.",

		"contact.reachOut.title": "Reach Out Anytime",
		"contact.reachOut.subtitle": "We're here to answer your questions and assist with your physiotherapy needs.",
		"contact.form.name": "Name",
		"contact.form.email": "Email",
		"contact.form.phone": "Phone",
		"contact.form.subject": "Subject",
		"contact.form.message": "Message",
		"contact.form.selectSubject": "Select subject",
		"contact.form.subject.general": "General",
		"contact.form.subject.appointment": "Appointment",
		"contact.form.subject.treatment": "Treatment",
		"contact.form.subject.other": "Other",
		"contact.form.send": "Send Message",
		"common.cancel": "Cancel",
		"contact.directions": "Get Directions",
		"toast.contact.success": "Message sent successfully. We will contact you soon.",
		"toast.contact.error": "Failed to send message. Please try again.",

		"contact.bookDirect.title": "Prefer to book directly?",
		"contact.bookDirect.subtitle": "Visit our clinic for quick appointments and in-person support. Find us on the map below and book instantly.",

		"footer.about": "We provide expert physiotherapy care to help you recover, stay active, and live a pain-free life. Your health and well-being are our top priority.",
		"footer.quickLinks": "Quick Links",
		"footer.service": "Service",
		"footer.time": "Time",
		"footer.noDays": "No specific days",
		"footer.closed": "(Closed)",
		"footer.copyright": "© 2024 Clinic Name | Privacy Policy | Terms of Service",
		"footer.service.sports": "Sports Injury Rehabilitation",
		"footer.service.postSurgical": "Post-Surgical Therapy",
		"footer.service.pain": "Pain Management Therapy",
		"footer.service.neuro": "Neurological Rehabilitation",
		"footer.service.ortho": "Orthopedic Rehabilitation",
		"footer.service.pediatric": "Pediatric & Geriatric Therapy",

		"common.loadingReviews": "Loading reviews...",
		"common.failedLoadReviews": "Failed to load reviews.",
		"common.noReviews": "No reviews yet.",
		"common.loadingTreatments": "Loading treatments...",
		"common.failedLoadTreatments": "Failed to load treatments.",
			"common.or": "or",
			"common.optionalParen": "(optional)",
			"common.emptyDash": "—",
		"workingHours.loading": "Loading working hours...",
		"workingHours.error": "Error loading working hours. Please try again later.",
		"about.loadingSections": "Loading sections...",
		"about.errorSections": "Failed to load sections.",
		"workingHours.titleGreen": "Our Working ",
		"workingHours.titleBlack": "Hours",
		"workingHours.description": "Check our weekly schedule and book your appointment at a convenient time.",
		"workingHours.noSpecificDays": "No specific days",
		"workingHours.closed": "Closed",

		"home.hero.advanced": "Advanced",
		"home.hero.physiotherapy": "Physiotherapy",
		"home.hero.tagline": "for Pain Relief & Mobility",
		"home.hero.description": "Experience expert physiotherapy care in a warm, supportive environment focused on your long-term well-being.",
		"home.hero.bookOnWhatsapp": "Book on WhatsApp",
		"home.hero.viewTreatments": "View Treatments",

		"home.cta.titleGreen": "Ready",
		"home.cta.titleBlack": " to Feel Better?",
		"home.cta.descriptionLine1": "Let our specialists help you restore mobility, relieve pain, and get back to what you love.",
		"home.cta.descriptionLine2": "Your healing journey starts today.",
		"home.cta.consultWithOur": "Consult With Our",
		"home.cta.physiotherapists": "Physiotherapists",
		"home.cta.leftDescription": "Let our expert therapists understand your condition and design a personalized treatment plan.",
		"home.cta.form.name": "Name",
		"home.cta.form.email": "Email",
		"home.cta.form.phone": "Phone",
		"home.cta.form.message": "Message",
		"home.cta.form.send": "Send",
		"home.cta.form.cancel": "Cancel",
		"home.cta.toastSuccess": "Message sent successfully. We will contact you soon.",
		"home.cta.toastError": "Failed to send message. Please try again.",

		"home.whyChooseUs.titleGreen": "Why ",
		"home.whyChooseUs.titleBlack": "Choose Us",
		"home.whyChooseUs.descriptionLine1": "With a patient-centered approach and evidence-based therapy, we deliver care that truly makes a difference.",
		"home.whyChooseUs.descriptionLine2": "From accurate assessment to ongoing support, we guide you through every step of your healing journey.",
		"home.whyChooseUs.features.expertTherapists.title": "Expert Therapists",
		"home.whyChooseUs.features.expertTherapists.description": "Highly trained and certified physiotherapists dedicated to accurate diagnosis and effective treatment.",
		"home.whyChooseUs.features.personalizedCare.title": "Personalized Care",
		"home.whyChooseUs.features.personalizedCare.description": "Every treatment plan is tailored to your condition, goals, and lifestyle for maximum recovery.",
		"home.whyChooseUs.features.modernTechniques.title": "Modern Techniques",
		"home.whyChooseUs.features.modernTechniques.description": "We use advanced physiotherapy methods and up-to-date clinical practices for better results.",
		"home.whyChooseUs.features.friendlyEnvironment.title": "Friendly Environment",
		"home.whyChooseUs.features.friendlyEnvironment.description": "Experience compassionate care in a calm and welcoming clinic that prioritizes your comfort.",

		"home.specializedTreatments.loading": "Loading treatments...",
		"home.specializedTreatments.error": "Failed to load treatments.",
		"home.specializedTreatments.titleGreen": "Specialized ",
		"home.specializedTreatments.titleBlack": "Treatments",
		"home.specializedTreatments.descriptionLine1": "We offer advanced therapy solutions tailored to your specific needs and health goals.",
		"home.specializedTreatments.descriptionLine2": "From injury rehabilitation to chronic pain relief, each treatment is focused on long-term wellness",

		"home.testimonialsPreview.title": "Testimonial",
		"home.testimonialsPreview.descriptionLine1": "Our patients share how personalized treatments and dedicated support helped them achieve a pain-free life.",
		"home.testimonialsPreview.descriptionLine2": "Their experiences speak for our commitment.",
		"home.testimonialsPreview.hearFrom": "Hear From",
		"home.testimonialsPreview.ourPatients": "Our Patients",
		"home.testimonialsPreview.scrollLeftAria": "Scroll testimonials left",
		"home.testimonialsPreview.scrollRightAria": "Scroll testimonials right",
		"home.testimonialsPreview.loading": "Loading reviews...",
		"home.testimonialsPreview.error": "Failed to load reviews.",
		"home.testimonialsPreview.patientFallback": "Patient",
		"home.testimonialsPreview.patientLabel": "Patient",

			"contact.info.emailTitle": "Email Address",
			"contact.info.phoneTitle": "Phone Number",
			"contact.info.locationTitle": "Hospital Location",
			"contact.info.workingDayTitle": "Working Day",

			"testimonials.recentFeedbacks": "Recent Feedbacks",
			"testimonials.addReview": "Add a Review",
			"testimonials.form.addYourRating": "Add Your Rating",
			"testimonials.form.name": "Name",
			"testimonials.form.email": "Email",
			"testimonials.form.message": "Write Your Message",
			"testimonials.form.mediaUpload": "Media Upload",
			"testimonials.form.dragToUpload": "Drag your file to start uploading",
			"testimonials.form.browseFiles": "Browse Files",
			"testimonials.form.selectedFile": "Selected",
			"testimonials.form.supportedFiles": "Only support - jpg, png and zip files.",
			"testimonials.form.submitNow": "Submit Now",
			"testimonials.form.validationError": "Please fill all required fields and select rating.",
			"testimonials.toast.success": "Review submitted successfully.",
			"testimonials.toast.error": "Failed to submit review. Please try again.",
	},
	es: {
		"nav.home": "Inicio",
		"nav.services": "Servicios",
		"nav.about": "Sobre nosotros",
		"nav.testimonials": "Testimonios",
		"nav.contact": "Contacto",
		"action.bookWhatsApp": "Reservar por WhatsApp",

		"lang.en": "EN",
		"lang.es": "ES",

		"page.contact.title": "Contacta con nuestro equipo de fisioterapia",
		"page.contact.description": "¿Tienes preguntas sobre tu recuperación o nuestros tratamientos? Envíanos un mensaje y te responderemos pronto para orientarte.",
		"page.services.title": "Atención de fisioterapia integral",
		"page.services.description": "Desde rehabilitación de lesiones hasta manejo del dolor, nuestros servicios se adaptan a tus necesidades.",
		"page.testimonials.title": "Lo que dicen nuestros pacientes",
		"page.testimonials.description": "Historias reales de pacientes que recuperaron fuerza, movilidad y confianza con nuestro cuidado.",
		"page.about.title1": "Dedicados a tu recuperación",
		"page.about.desc1": "Nuestra clínica combina terapeutas con experiencia, técnicas modernas y una atención compasiva para acompañarte.",
		"page.about.title2": "Atención de fisioterapia",
		"page.about.desc2": "Nuestro centro ofrece servicios de fisioterapia de alta calidad en un entorno seguro y profesional. Con instalaciones modernas y atención centrada en el paciente, buscamos apoyar la recuperación, mejorar la movilidad y la calidad de vida.",
		"page.about.title3": "Cuidado para cada paciente",
		"page.about.desc3": "Ofrecemos planes personalizados, opciones de citas flexibles y acompañamiento continuo durante la recuperación. Nuestro objetivo es que cada paciente se sienta apoyado e informado en cada etapa.",
		"page.about.title4": "Especialistas en fisioterapia",
		"page.about.desc4": "Nuestro equipo está formado por fisioterapeutas certificados con experiencia en rehabilitación y manejo del dolor. Estamos comprometidos con la máxima calidad, adaptada a cada necesidad.",

		"about.highlight.trusted": "Confiable",
		"about.highlight.focused": "Enfocado",
		"about.highlight.meetOur": "Conoce a",
		"team.title.green": "Conoce",
		"team.title.black": " al equipo",
		"team.description": "Nuestros fisioterapeutas con experiencia están dedicados a brindar atención personalizada y tratamientos efectivos para cada paciente.",
		"team.prev": "Doctor anterior",
		"team.next": "Siguiente doctor",
		"team.loading": "Cargando doctores...",
		"team.error": "No se pudieron cargar los doctores.",

		"contact.reachOut.title": "Contáctanos en cualquier momento",
		"contact.reachOut.subtitle": "Estamos aquí para responder tus preguntas y ayudarte con tus necesidades de fisioterapia.",
		"contact.form.name": "Nombre",
		"contact.form.email": "Correo",
		"contact.form.phone": "Teléfono",
		"contact.form.subject": "Asunto",
		"contact.form.message": "Mensaje",
		"contact.form.selectSubject": "Selecciona un asunto",
		"contact.form.subject.general": "General",
		"contact.form.subject.appointment": "Cita",
		"contact.form.subject.treatment": "Tratamiento",
		"contact.form.subject.other": "Otro",
		"contact.form.send": "Enviar mensaje",
		"common.cancel": "Cancelar",
		"contact.directions": "Cómo llegar",
		"toast.contact.success": "Mensaje enviado correctamente. Nos pondremos en contacto pronto.",
		"toast.contact.error": "No se pudo enviar el mensaje. Inténtalo de nuevo.",

		"contact.bookDirect.title": "¿Prefieres reservar directamente?",
		"contact.bookDirect.subtitle": "Visita nuestra clínica para citas rápidas y atención presencial. Encuéntranos en el mapa y reserva al instante.",

		"footer.about": "Brindamos atención experta de fisioterapia para ayudarte a recuperarte, mantenerte activo y vivir sin dolor. Tu salud y bienestar son nuestra prioridad.",
		"footer.quickLinks": "Enlaces rápidos",
		"footer.service": "Servicios",
		"footer.time": "Horario",
		"footer.noDays": "Sin días específicos",
		"footer.closed": "(Cerrado)",
		"footer.copyright": "© 2024 Clinic Name | Política de privacidad | Términos del servicio",
		"footer.service.sports": "Rehabilitación de lesiones deportivas",
		"footer.service.postSurgical": "Terapia postquirúrgica",
		"footer.service.pain": "Terapia para manejo del dolor",
		"footer.service.neuro": "Rehabilitación neurológica",
		"footer.service.ortho": "Rehabilitación ortopédica",
		"footer.service.pediatric": "Terapia pediátrica y geriátrica",

		"common.loadingReviews": "Cargando reseñas...",
		"common.failedLoadReviews": "No se pudieron cargar las reseñas.",
		"common.noReviews": "Aún no hay reseñas.",
		"common.loadingTreatments": "Cargando tratamientos...",
		"common.failedLoadTreatments": "No se pudieron cargar los tratamientos.",
			"common.or": "o",
			"common.optionalParen": "(opcional)",
			"common.emptyDash": "—",
		"workingHours.loading": "Cargando horarios...",
		"workingHours.error": "Error al cargar los horarios. Inténtalo más tarde.",
		"about.loadingSections": "Cargando secciones...",
		"about.errorSections": "No se pudieron cargar las secciones.",
		"workingHours.titleGreen": "Nuestro ",
		"workingHours.titleBlack": "Horario",
		"workingHours.description": "Consulta nuestro horario semanal y reserva tu cita en un momento conveniente.",
		"workingHours.noSpecificDays": "Sin días específicos",
		"workingHours.closed": "Cerrado",

		"home.hero.advanced": "Avanzada",
		"home.hero.physiotherapy": "Fisioterapia",
		"home.hero.tagline": "para alivio del dolor y movilidad",
		"home.hero.description": "Recibe atención de fisioterapia experta en un entorno cálido y de apoyo, enfocado en tu bienestar a largo plazo.",
		"home.hero.bookOnWhatsapp": "Reservar por WhatsApp",
		"home.hero.viewTreatments": "Ver tratamientos",

		"home.cta.titleGreen": "¿Listo",
		"home.cta.titleBlack": " para sentirte mejor?",
		"home.cta.descriptionLine1": "Deja que nuestros especialistas te ayuden a recuperar movilidad, aliviar el dolor y volver a lo que amas.",
		"home.cta.descriptionLine2": "Tu camino de recuperación comienza hoy.",
		"home.cta.consultWithOur": "Consulta con nuestros",
		"home.cta.physiotherapists": "fisioterapeutas",
		"home.cta.leftDescription": "Nuestros terapeutas expertos evaluarán tu condición y diseñarán un plan de tratamiento personalizado.",
		"home.cta.form.name": "Nombre",
		"home.cta.form.email": "Correo",
		"home.cta.form.phone": "Teléfono",
		"home.cta.form.message": "Mensaje",
		"home.cta.form.send": "Enviar",
		"home.cta.form.cancel": "Cancelar",
		"home.cta.toastSuccess": "Mensaje enviado correctamente. Nos pondremos en contacto pronto.",
		"home.cta.toastError": "No se pudo enviar el mensaje. Inténtalo de nuevo.",

		"home.whyChooseUs.titleGreen": "Por qué ",
		"home.whyChooseUs.titleBlack": "elegirnos",
		"home.whyChooseUs.descriptionLine1": "Con un enfoque centrado en el paciente y terapia basada en evidencia, brindamos una atención que realmente marca la diferencia.",
		"home.whyChooseUs.descriptionLine2": "Desde la evaluación precisa hasta el acompañamiento continuo, te guiamos en cada paso de tu recuperación.",
		"home.whyChooseUs.features.expertTherapists.title": "Terapeutas expertos",
		"home.whyChooseUs.features.expertTherapists.description": "Fisioterapeutas altamente capacitados y certificados, dedicados a un diagnóstico preciso y tratamientos efectivos.",
		"home.whyChooseUs.features.personalizedCare.title": "Atención personalizada",
		"home.whyChooseUs.features.personalizedCare.description": "Cada plan se adapta a tu condición, objetivos y estilo de vida para una recuperación máxima.",
		"home.whyChooseUs.features.modernTechniques.title": "Técnicas modernas",
		"home.whyChooseUs.features.modernTechniques.description": "Usamos métodos avanzados y prácticas clínicas actualizadas para mejores resultados.",
		"home.whyChooseUs.features.friendlyEnvironment.title": "Ambiente amable",
		"home.whyChooseUs.features.friendlyEnvironment.description": "Vive una atención compasiva en una clínica tranquila y acogedora que prioriza tu comodidad.",

		"home.specializedTreatments.loading": "Cargando tratamientos...",
		"home.specializedTreatments.error": "No se pudieron cargar los tratamientos.",
		"home.specializedTreatments.titleGreen": "Tratamientos ",
		"home.specializedTreatments.titleBlack": "especializados",
		"home.specializedTreatments.descriptionLine1": "Ofrecemos soluciones terapéuticas avanzadas adaptadas a tus necesidades y objetivos de salud.",
		"home.specializedTreatments.descriptionLine2": "Desde rehabilitación de lesiones hasta alivio del dolor crónico, cada tratamiento se enfoca en el bienestar a largo plazo",

		"home.testimonialsPreview.title": "Testimonios",
		"home.testimonialsPreview.descriptionLine1": "Nuestros pacientes comparten cómo los tratamientos personalizados y el apoyo dedicado les ayudaron a vivir sin dolor.",
		"home.testimonialsPreview.descriptionLine2": "Sus experiencias reflejan nuestro compromiso.",
		"home.testimonialsPreview.hearFrom": "Escucha a",
		"home.testimonialsPreview.ourPatients": "nuestros pacientes",
		"home.testimonialsPreview.scrollLeftAria": "Desplazar testimonios a la izquierda",
		"home.testimonialsPreview.scrollRightAria": "Desplazar testimonios a la derecha",
		"home.testimonialsPreview.loading": "Cargando reseñas...",
		"home.testimonialsPreview.error": "No se pudieron cargar las reseñas.",
		"home.testimonialsPreview.patientFallback": "Paciente",
		"home.testimonialsPreview.patientLabel": "Paciente",

			"contact.info.emailTitle": "Correo electrónico",
			"contact.info.phoneTitle": "Número de teléfono",
			"contact.info.locationTitle": "Ubicación del hospital",
			"contact.info.workingDayTitle": "Día laborable",

			"testimonials.recentFeedbacks": "Comentarios recientes",
			"testimonials.addReview": "Añadir una reseña",
			"testimonials.form.addYourRating": "Añade tu calificación",
			"testimonials.form.name": "Nombre",
			"testimonials.form.email": "Correo",
			"testimonials.form.message": "Escribe tu mensaje",
			"testimonials.form.mediaUpload": "Subir archivo",
			"testimonials.form.dragToUpload": "Arrastra tu archivo para comenzar a subirlo",
			"testimonials.form.browseFiles": "Buscar archivos",
			"testimonials.form.selectedFile": "Seleccionado",
			"testimonials.form.supportedFiles": "Solo se admiten archivos jpg, png y zip.",
			"testimonials.form.submitNow": "Enviar",
			"testimonials.form.validationError": "Completa los campos obligatorios y selecciona una calificación.",
			"testimonials.toast.success": "Reseña enviada correctamente.",
			"testimonials.toast.error": "No se pudo enviar la reseña. Inténtalo de nuevo.",
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
		(key: TranslationKey) => translations[language][key] ?? translations.en[key] ?? key,
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

