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
    "page.contact.description":
      "Real stories of patients who have regained mobility, well-being, and confidence with the support of our team",
    "page.services.title": "Comprehensive care in physiotherapy and osteopathy",
    "page.services.description":
      "From injury rehabilitation to pain management, these are the procedures and techniques most commonly used in our practice",
    "page.testimonials.title": "What Our Patient Say",
    "page.testimonials.description":
      "Hear real stories from patients who regained strength, mobility, and confidence through our care",
    "page.about.title1": "Dedicated to Your Recovery",
    "page.about.desc1":
      "Our clinic is staffed by highly trained and experienced therapists focused on identifying the root cause of your symptoms and guiding you toward an effective and lasting recovery.",
    "page.about.title2": "Physiotherapy Care",
    "page.about.desc2":
      "Our hospital is dedicated to delivering high-quality physiotherapy services in a safe and professional environment. With modern facilities and patient-focused care, we aim to support recovery, improve mobility, and enhance overall quality of life for every individual we serve",
    "page.about.title3": "Care for Every Patient",
    "page.about.desc3":
      "We provide personalized treatment plans, flexible appointment options, and continuous guidance throughout the recovery process. Our goal is to ensure each patient feels supported, informed, and confident at every stage of their therapy journey",
    "page.about.title4": "Physiotherapy Specialists",
    "page.about.desc4":
      "Our team consists of experienced and certified physiotherapists who specialize in various rehabilitation and pain management techniques. We are committed to delivering the highest standard of care, tailored to individual needs",

    "about.highlight.trusted": "Trusted",
    "about.highlight.focused": "Focused",
    "about.highlight.meetOur": "Meet Our",
    "team.title.green": "Meet",
    "team.title.black": " the Team",
    "team.description":
      "Our team consists of two physiotherapists and a podiatrist, all trained and experienced in various areas of rehabilitation and pain management, as well as in analyzing biomechanical issues that may affect your body",
    "team.prev": "Previous doctor",
    "team.next": "Next doctor",
    "team.loading": "Loading doctors...",
    "team.error": "Failed to load doctors.",

    "contact.reachOut.title": "Reach Out Anytime",
    "contact.reachOut.subtitle":
      "We're here to answer your questions and assist with your physiotherapy needs.",
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
    "toast.contact.success":
      "Message sent successfully. We will contact you soon.",
    "toast.contact.error": "Failed to send message. Please try again.",
    "legal.notice.content": "In compliance with Article 10 of Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the following information is provided regarding this website:\n\n**Owner:** Ana España Rodríguez\n\n**Trading Name:** Fisioterapia y osteopatía Ana España\n\n**Tax ID (NIF/CIF):** 15458762W\n\n**Registered Address:** C/Batalla del Salado 55, 11380 Tarifa (Cádiz)\n\n**Telephone:** +34618571959\n\n**Email:** anaespanaro@gmail.com\n\n**Professional Registration Number:** 6935\n\nThis website aims to provide information about the physiotherapy services offered by the clinic, as well as to allow users to request appointments and contact the clinic.\n\nAccessing and using this website grants the status of user and implies full acceptance of the terms set out herein. The user undertakes to make appropriate use of the website and not to use it for unlawful activities or activities contrary to good faith and public order.\n\nAll website content, including texts, images, logos, design, structure and source code, is protected by intellectual and industrial property rights. Reproduction, distribution or public communication without the express authorization of the owner is strictly prohibited.\n\nThe owner shall not be held liable for misuse of the website content or for any damages arising from access to or use of the website.",
    "legal.privacy.content": "**Data Controller:** Ana España Rodríguez\n\n**Tax ID:** 15458762W\n\n**Address:** C/Batalla del Salado 55, 11380 Tarifa (Cádiz)\n\n**Email:** anaespanaro@gmail.com\n\nPersonal data collected through this website will be processed for the following purposes:\n\n*   Online appointment management.\n*   Responding to inquiries submitted through contact forms.\n*   Administrative, accounting and tax management.\n*   Management of patient clinical records.\n*   Sending commercial communications, where the data subject has provided consent.\n\nThe legal basis for processing is the data subject’s consent, the performance of a healthcare service contract, and compliance with legal obligations in healthcare matters. Health data is processed in accordance with Article 9.2(h) of Regulation (EU) 2016/679 (GDPR).\n\nData will be retained for the duration of the professional relationship and for the periods required by applicable healthcare and tax regulations.\n\nPersonal data will not be disclosed to third parties unless legally required. Service providers such as IT hosting companies, accounting advisors and banking institutions may have access to data under appropriate data processing agreements.\n\nData subjects may exercise their rights of access, rectification, erasure, objection, restriction of processing and data portability by sending a request together with a copy of their identification document to anaespanaro@gmail.com. They also have the right to lodge a complaint with the Spanish Data Protection Authority.",
    "legal.cookies.content": "This website uses first-party and third-party cookies to improve user experience.\n\nCookies may be technical (necessary for website operation), analytical (to measure website usage), or personalization cookies.\n\nUsers may accept, reject or configure cookie preferences through the settings panel available upon accessing the website. Cookies may also be deleted through the browser settings.",
    "legal.terms.content": "The clinic provides physiotherapy services delivered by qualified and licensed professionals in accordance with Spanish regulations.\n\nAppointments must be cancelled at least 24 hours in advance. Failure to attend without prior notice may result in the application of the clinic’s cancellation policy.\n\nAll prices include applicable taxes. The clinic reserves the right to modify prices at any time.\n\nHealthcare treatments do not guarantee specific results, as outcomes depend on individual patient factors.",
    "contact.form.privacyConsent": "I have read and accept the Privacy Policy and I consent to the processing of my personal data for the purpose of managing my inquiry.",

    "contact.bookDirect.title": "Prefer to book directly?",
    "contact.bookDirect.subtitle":
      "Visit our clinic for quick appointments and in-person support. Find us on the map below and book instantly",

    "footer.about":
      "We provide expert physiotherapy care to help you recover, stay active, and live a pain-free life. Your health and well-being are our top priority",
    "footer.quickLinks": "Quick Links",
    "footer.service": "Service",
    "footer.time": "Time",
    "footer.noDays": "No specific days",
    "footer.closed": "(Closed)",
    "footer.copyright": "© 2026 Ana España Rodríguez",
    "legal.notice.title": "Legal Notice",
    "legal.privacy.title": "Privacy Policy",
    "legal.cookies.title": "Cookie Policy",
    "legal.terms.title": "General Terms and Conditions",
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
    "workingHours.error":
      "Error loading working hours. Please try again later.",
    "about.loadingSections": "Loading sections...",
    "about.errorSections": "Failed to load sections.",
    "workingHours.titleGreen": "Our Working ",
    "workingHours.titleBlack": "Hours",
    "workingHours.description":
      "Check our weekly schedule and book your appointment at a convenient time.",
    "workingHours.noSpecificDays": "No specific days",
    "workingHours.closed": "Closed",

    "home.hero.advanced": "Advanced",
    "home.hero.physiotherapy": "Physiotherapy and Osteopathy ",
    "home.hero.tagline": "for Pain Relief & Mobility",
    "home.hero.description":
      "Experienced professionals who support you in a friendly and supportive environment, focused on improving your quality of life",
    "home.hero.bookOnWhatsapp": "Book on WhatsApp",
    "home.hero.viewTreatments": "View Treatments",

    "home.cta.titleGreen": "Ready",
    "home.cta.titleBlack": " to Feel Better?",
    "home.cta.descriptionLine1":
      "Let our specialists help you restore mobility, relieve pain, and get back to what you love",
    "home.cta.descriptionLine2": "Your healing journey starts today.",
    "home.cta.consultWithOur": "Consult With Our",
    "home.cta.physiotherapists": "Physiotherapists",
    "home.cta.leftDescription":
      "Let our expert therapists understand your condition and design a personalized treatment plan",
    "home.cta.form.name": "Name",
    "home.cta.form.email": "Email",
    "home.cta.form.phone": "Phone",
    "home.cta.form.message": "Message",
    "home.cta.form.send": "Send",
    "home.cta.form.cancel": "Cancel",
    "home.cta.toastSuccess":
      "Message sent successfully. We will contact you soon.",
    "home.cta.toastError": "Failed to send message. Please try again.",

    "home.whyChooseUs.titleGreen": "Why ",
    "home.whyChooseUs.titleBlack": "Choose Us",
    "home.whyChooseUs.descriptionLine1":
      "With a patient-centered approach and evidence-based therapies, we provide the care you need",
    "home.whyChooseUs.descriptionLine2":
      "From precise assessments to ongoing support, we guide you through every step of your recovery process",
    "home.whyChooseUs.features.expertTherapists.title": "Expert Therapists",
    "home.whyChooseUs.features.expertTherapists.description":
      "Certified and trained physiotherapists, dedicated to providing accurate diagnoses and tailored treatments",
    "home.whyChooseUs.features.personalizedCare.title": "Personalized Care",
    "home.whyChooseUs.features.personalizedCare.description":
      "Each treatment plan is tailored to your condition, goals, and lifestyle, ensuring optimal recovery",
    "home.whyChooseUs.features.modernTechniques.title": "Modern Techniques",
    "home.whyChooseUs.features.modernTechniques.description":
      "We use modern, up-to-date techniques to achieve the best results.",
    "home.whyChooseUs.features.friendlyEnvironment.title": "Warm Environment",
    "home.whyChooseUs.features.friendlyEnvironment.description":
      "A calm and welcoming space where your well-being and comfort are our top priority",

    "home.specializedTreatments.loading": "Loading treatments...",
    "home.specializedTreatments.error": "Failed to load treatments",
    "home.specializedTreatments.titleGreen": "Specialized ",
    "home.specializedTreatments.titleBlack": "Treatments",
    "home.specializedTreatments.descriptionLine1":
      "We offer advanced therapies tailored to each patient’s needs",
    "home.specializedTreatments.descriptionLine2":
      "Our goal is to identify the root cause of the symptoms",

    "home.testimonialsPreview.title": "Testimonial",
    "home.testimonialsPreview.descriptionLine1":
      "Our patients share how personalized treatments and dedicated support have helped them improve.",
    "home.testimonialsPreview.descriptionLine2":
      "Their experiences reflect our commitment to their well-being.",
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
    "contact.info.locationTitle": "Clinic location",
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
    "testimonials.form.supportedFiles":
      "Only support - jpg, png and zip files.",
    "testimonials.form.submitNow": "Submit Now",
    "testimonials.form.validationError":
      "Please fill all required fields and select rating.",
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
    "page.contact.description":
      "Historias reales de pacientes que han recuperado movilidad, bienestar y confianza con la ayuda de nuestro equipo.",
    "page.services.title": "Atención integral en fisioterapia y osteopatía",
    "page.services.description":
      "Desde la rehabilitación de lesiones hasta el manejo del dolor, estos son los procedimientos y técnicas más utilizados en nuestra consulta.",
    "page.testimonials.title": "Lo que dicen nuestros pacientes",
    "page.testimonials.description":
      "Historias reales de pacientes que recuperaron fuerza, movilidad y confianza con nuestro cuidado.",
    "page.about.title1": "Dedicados a tu recuperación",
    "page.about.desc1":
      "Nuestra clínica cuenta con terapeutas altamente formados y con amplia experiencia, enfocados en identificar el origen del síntoma y acompañarte hacia una recuperación eficaz y duradera.",
    "page.about.title2": "Atención de fisioterapia",
    "page.about.desc2":
      "Nuestro centro ofrece servicios de fisioterapia de alta calidad en un entorno seguro y profesional. Con instalaciones modernas y atención centrada en el paciente, buscamos apoyar la recuperación, mejorar la movilidad y la calidad de vida.",
    "page.about.title3": "Cuidado para cada paciente",
    "page.about.desc3":
      "Ofrecemos planes personalizados, opciones de citas flexibles y acompañamiento continuo durante la recuperación. Nuestro objetivo es que cada paciente se sienta apoyado e informado en cada etapa.",
    "page.about.title4": "Especialistas en fisioterapia",
    "page.about.desc4":
      "Nuestro equipo está formado por fisioterapeutas certificados con experiencia en rehabilitación y manejo del dolor. Estamos comprometidos con la máxima calidad, adaptada a cada necesidad.",

    "about.highlight.trusted": "Confiable",
    "about.highlight.focused": "Enfocado",
    "about.highlight.meetOur": "Conoce a",
    "team.title.green": "Conoce",
    "team.title.black": " al equipo",
    "team.description":
      "Nuestro equipo está compuesto por dos fisioterapeutas y una podóloga, todas formadas y con experiencia en diversas áreas de la rehabilitación y el manejo del dolor, así como en el estudio de problemas biomecánicos que pueden afectar tu cuerpo.",
    "team.prev": "Doctor anterior",
    "team.next": "Siguiente doctor",
    "team.loading": "Cargando doctores...",
    "team.error": "No se pudieron cargar los doctores.",

    "contact.reachOut.title": "Contáctanos en cualquier momento",
    "contact.reachOut.subtitle":
      "Estamos aquí para responder tus preguntas y ayudarte con tus necesidades de fisioterapia.",
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
    "toast.contact.success":
      "Mensaje enviado correctamente. Nos pondremos en contacto pronto.",
    "toast.contact.error": "No se pudo enviar el mensaje. Inténtalo de nuevo.",
    "contact.form.privacyConsent": "Consiento el tratamiento de mis datos personales, incluidos datos relativos a mi salud que pueda facilitar en el mensaje, con la finalidad de gestionar mi consulta, conforme al Reglamento (UE) 2016/679.",

    "contact.bookDirect.title": "¿Prefieres reservar directamente?",
    "contact.bookDirect.subtitle":
      "Visita nuestra clínica para citas rápidas y atención presencial. Encuéntranos en el mapa y reserva al instante.",

    "footer.about":
      "Brindamos atención experta de fisioterapia para ayudarte a recuperarte, mantenerte activo y vivir sin dolor. Tu salud y bienestar son nuestra prioridad.",
    "footer.quickLinks": "Enlaces rápidos",
    "footer.service": "Servicios",
    "footer.time": "Horario",
    "footer.noDays": "Sin días específicos",
    "footer.closed": "(Cerrado)",
    "footer.copyright": "© 2026 Ana España Rodríguez",
    "legal.notice.title": "Aviso Legal",
    "legal.privacy.title": "Política de Privacidad",
    "legal.cookies.title": "Política de Cookies",
    "legal.terms.title": "Condiciones Generales de Contratación",
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
    "workingHours.description":
      "Consulta nuestro horario semanal y reserva tu cita en un momento conveniente.",
    "workingHours.noSpecificDays": "Sin días específicos",
    "workingHours.closed": "Cerrado",

    "home.hero.advanced": "Avanzada",
    "home.hero.physiotherapy": "Fisioterapia y Osteopatía",
    "home.hero.tagline": "alivio del dolor y mejora de tu movilidad.",
    "home.hero.description":
      "Profesionales con experiencia que te acompañan en un entorno cercano y de apoyo, enfocado en mejorar tu calidad de vida.",
    "home.hero.bookOnWhatsapp": "Reservar por WhatsApp",
    "home.hero.viewTreatments": "Ver tratamientos",

    "home.cta.titleGreen": "¿Listo",
    "home.cta.titleBlack": " para sentirte mejor?",
    "home.cta.descriptionLine1":
      "Deja que nuestros especialistas te ayuden a recuperar movilidad, aliviar el dolor y volver a lo que amas.",
    "home.cta.descriptionLine2": "Tu camino de recuperación comienza hoy.",
    "home.cta.consultWithOur": "Consulta con nuestros",
    "home.cta.physiotherapists": "fisioterapeutas",
    "home.cta.leftDescription":
      "Nuestros terapeutas expertos evaluarán tu condición y diseñarán un plan de tratamiento personalizado.",
    "home.cta.form.name": "Nombre",
    "home.cta.form.email": "Correo",
    "home.cta.form.phone": "Teléfono",
    "home.cta.form.message": "Mensaje",
    "home.cta.form.send": "Enviar",
    "home.cta.form.cancel": "Cancelar",
    "home.cta.toastSuccess":
      "Mensaje enviado correctamente. Nos pondremos en contacto pronto.",
    "home.cta.toastError": "No se pudo enviar el mensaje. Inténtalo de nuevo.",

    "home.whyChooseUs.titleGreen": "Por qué ",
    "home.whyChooseUs.titleBlack": "elegirnos",
    "home.whyChooseUs.descriptionLine1":
      "Con un enfoque centrado en el paciente y terapias basadas en la evidencia, ofrecemos la atención que necesitas.",
    "home.whyChooseUs.descriptionLine2":
      "Desde una evaluación precisa hasta un acompañamiento continuo, te guiamos en cada paso de tu proceso de recuperación.",
    "home.whyChooseUs.features.expertTherapists.title": "Terapeutas expertos",
    "home.whyChooseUs.features.expertTherapists.description":
      "Fisioterapeutas certificados y capacitados, comprometidos en ofrecer diagnósticos precisos y tratamientos personalizados.",
    "home.whyChooseUs.features.personalizedCare.title":
      "Atención personalizada",
    "home.whyChooseUs.features.personalizedCare.description":
      "Cada plan de tratamiento se adapta a tu condición, objetivos y estilo de vida, asegurando una recuperación óptima.",
    "home.whyChooseUs.features.modernTechniques.title": "Técnicas modernas",
    "home.whyChooseUs.features.modernTechniques.description":
      "Aplicamos técnicas modernas y actualizadas para lograr los mejores resultados.",
    "home.whyChooseUs.features.friendlyEnvironment.title": "Ambiente cálido",
    "home.whyChooseUs.features.friendlyEnvironment.description":
      "Un espacio tranquilo y acogedor, donde tu bienestar y comodidad son nuestra máxima prioridad.",

    "home.specializedTreatments.loading": "Cargando tratamientos...",
    "home.specializedTreatments.error":
      "No se pudieron cargar los tratamientos.",
    "home.specializedTreatments.titleGreen": "Tratamientos ",
    "home.specializedTreatments.titleBlack": "especializados",
    "home.specializedTreatments.descriptionLine1":
      "Ofrecemos terapias avanzadas adaptadas a las necesidades de cada paciente.",
    "home.specializedTreatments.descriptionLine2":
      "Nuestro objetivo es buscar el origen de la sintomatología.",

    "home.testimonialsPreview.title": "Testimonios",
    "home.testimonialsPreview.descriptionLine1":
      "Nuestros pacientes comparten cómo los tratamientos personalizados y el apoyo constante les han ayudado a mejorar.",
    "home.testimonialsPreview.descriptionLine2":
      "Sus experiencias respaldan nuestro compromiso con su bienestar.",
    "home.testimonialsPreview.hearFrom": "Escucha a",
    "home.testimonialsPreview.ourPatients": "nuestros pacientes",
    "home.testimonialsPreview.scrollLeftAria":
      "Desplazar testimonios a la izquierda",
    "home.testimonialsPreview.scrollRightAria":
      "Desplazar testimonios a la derecha",
    "home.testimonialsPreview.loading": "Cargando reseñas...",
    "home.testimonialsPreview.error": "No se pudieron cargar las reseñas.",
    "home.testimonialsPreview.patientFallback": "Paciente",
    "home.testimonialsPreview.patientLabel": "Paciente",

    "contact.info.emailTitle": "Correo electrónico",
    "contact.info.phoneTitle": "Número de teléfono",
    "contact.info.locationTitle": "Ubicación de la clínica",
    "contact.info.workingDayTitle": "Horario",

    "testimonials.recentFeedbacks": "Comentarios recientes",
    "testimonials.addReview": "Añadir una reseña",
    "testimonials.form.addYourRating": "Añade tu calificación",
    "testimonials.form.name": "Nombre",
    "testimonials.form.email": "Correo",
    "testimonials.form.message": "Escribe tu mensaje",
    "testimonials.form.mediaUpload": "Subir archivo",
    "testimonials.form.dragToUpload":
      "Arrastra tu archivo para comenzar a subirlo",
    "testimonials.form.browseFiles": "Buscar archivos",
    "testimonials.form.selectedFile": "Seleccionado",
    "testimonials.form.supportedFiles":
      "Solo se admiten archivos jpg, png y zip.",
    "testimonials.form.submitNow": "Enviar",
    "testimonials.form.validationError":
      "Completa los campos obligatorios y selecciona una calificación.",
    "testimonials.toast.success": "Reseña enviada correctamente.",
    "testimonials.toast.error":
      "No se pudo enviar la reseña. Inténtalo de nuevo.",
    "legal.notice.content": "En cumplimiento de lo dispuesto en el artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa que el presente sitio web es titularidad de:\n\n**Titular:** Ana España Rodríguez\n\n**Nombre comercial:** Fisioterapia y osteopatía Ana España\n\n**NIF/CIF:** 15458762W\n\n**Domicilio social:** C/Batalla del Salado 55, 11380 Tarifa (Cádiz)\n\n**Teléfono:** +34618571959\n\n**Correo electrónico:** anaespanaro@gmail.com\n\n**Número de colegiado:** 6935\n\nEl sitio web tiene como finalidad ofrecer información sobre los servicios de fisioterapia prestados por la clínica, así como permitir la solicitud de citas y el contacto con los usuarios.\n\nEl acceso y uso del sitio web atribuye la condición de usuario e implica la aceptación de las condiciones aquí recogidas. El usuario se compromete a hacer un uso adecuado del sitio web y a no emplearlo para actividades ilícitas o contrarias a la buena fe y al orden público.\n\nTodos los contenidos del sitio web, incluyendo textos, imágenes, logotipos, diseño, estructura y código fuente, están protegidos por derechos de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o comunicación pública sin autorización expresa del titular.\n\nEl titular no se responsabiliza del mal uso de los contenidos del sitio web ni de los daños que puedan derivarse del acceso o uso del mismo.",
    "legal.privacy.content": "**Responsable del tratamiento:** Ana España Rodríguez\n\n**NIF/CIF:** 15458762W\n\n**Dirección:** C/Batalla del Salado 55, 11380 Tarifa (Cádiz)\n\n**Correo electrónico:** anaespanaro@gmail.com\n\nLos datos personales recogidos a través de este sitio web serán tratados con las siguientes finalidades:\n\n*   Gestión de citas online.\n*   Atención de consultas realizadas a través de formularios.\n*   Gestión administrativa, contable y fiscal.\n*   Gestión del historial clínico del paciente.\n*   Envío de comunicaciones comerciales, en caso de contar con el consentimiento del interesado.\n\nLa base legal para el tratamiento es el consentimiento del interesado, la ejecución del contrato de prestación de servicios sanitarios y el cumplimiento de obligaciones legales en materia sanitaria. En el caso de datos de salud, el tratamiento se realiza conforme al artículo 9.2.h del Reglamento (UE) 2016/679.\n\nLos datos se conservarán mientras exista relación profesional y durante los plazos exigidos por la normativa sanitaria y fiscal aplicable.\n\nNo se cederán datos a terceros salvo obligación legal. Podrán tener acceso a los datos proveedores de servicios tecnológicos, asesoría fiscal y contable y entidades bancarias, con los correspondientes contratos de encargado de tratamiento.\n\nEl interesado puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad enviando solicitud junto con copia de su documento de identidad a anaespanaro@gmail.com. Asimismo, puede presentar reclamación ante la Agencia Española de Protección de Datos.",
    "legal.cookies.content": "Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia del usuario.\n\nLas cookies pueden ser técnicas, necesarias para el funcionamiento del sitio web; de análisis, para medir el uso del sitio; o de personalización.\n\nEl usuario puede aceptar, rechazar o configurar el uso de cookies a través del panel de configuración habilitado al acceder al sitio web. Asimismo, puede eliminarlas mediante la configuración de su navegador.",
    "legal.terms.content": "La clínica ofrece servicios de fisioterapia realizados por profesionales titulados y colegiados conforme a la normativa española vigente.\n\nLas citas deberán cancelarse con al menos 24 horas de antelación. En caso de no asistencia sin previo aviso, la clínica podrá aplicar la política de cobro establecida.\n\nLos precios indicados incluyen los impuestos aplicables. La clínica se reserva el derecho a modificar los precios.\n\nLos tratamientos sanitarios no garantizan resultados específicos, ya que estos dependen de factores individuales de cada paciente.",
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
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    let timeoutId: number | undefined;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && isLanguage(stored)) {
        timeoutId = window.setTimeout(() => {
          setLanguageState(stored);
        }, 0);
      }
    } catch {
      // ignore
    }
    return () => {
      if (timeoutId != null) window.clearTimeout(timeoutId);
    };
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
    (key: TranslationKey) =>
      translations[language][key] ?? translations.en[key] ?? key,
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
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
