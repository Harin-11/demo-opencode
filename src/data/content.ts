import type { Content } from "./types";

export const content: Content = {
	seo: {
		title: "Rutas del Sol — Turismo Receptivo Arequipa",
		description:
			"Descubre la historia y paisajes de Arequipa con Rutas del Sol. Trekking guiados al Cañón del Colca, itinerarios por la Ciudad Blanca y experiencias culturales vivenciales.",
	},

	nav: {
		brandName: "Rutas del Sol",
		links: [
			{ label: "Experiencias", href: "#experiencias" },
			{ label: "Itinerarios", href: "#itinerarios" },
			{ label: "Galería", href: "#galeria" },
			{ label: "Contacto", href: "#contacto" },
		],
	},

	hero: {
		heading: "Descubre los caminos que cuentan historias",
		subheading:
			"Trekking guiados · Experiencias culturales · Itinerarios cortos",
		primaryCta: { label: "Explora experiencias", href: "#experiencias" },
		secondaryCta: { label: "Ver itinerarios", href: "#itinerarios" },
		bgImage: "https://picsum.photos/seed/arequipa-campina-verde/1920/1080",
		bgImageAlt:
			"Campiña arequipeña con terrazas de cultivo y el Misti al fondo",
	},

	features: {
		cards: [
			{
				id: "trekking",
				title: "Caminos ancestrales",
				description:
					"Camina por senderos que las montañas guardan hace siglos. El Cañón del Colca, el Valle de los Volcanes, el Camino del Inca. Cada paso, una historia.",
				variant: "image",
				image: {
					src: "https://picsum.photos/seed/colca-canyon-arequipa/800/600",
					alt: "Cañón del Colca al amanecer con el vuelo del cóndor",
				},
				size: "wide",
			},
			{
				id: "itinerarios",
				title: "Poco tiempo, muchas historias",
				description:
					"Itinerarios de 1 a 3 días para quienes quieren lo esencial sin apurarse. Diseñados al ritmo de cada viajero.",
				variant: "image",
				image: {
					src: "https://picsum.photos/seed/arequipa-plaza-armas/400/400",
					alt: "Plaza de Armas de Arequipa con la Catedral al fondo",
				},
				size: "default",
			},
			{
				id: "cultural",
				title: "Teje la memoria",
				description:
					"Visita el Monasterio de Santa Catalina, prueba la cocina arequipeña, recorre la Ruta del Sillar. El viaje no termina en el paisaje: entra en las manos que lo trabajan.",
				variant: "image",
				image: {
					src: "https://picsum.photos/seed/santa-catalina-arequipa/400/600",
					alt: "Monasterio de Santa Catalina, calles coloridas de Arequipa",
				},
				size: "tall",
			},
			{
				id: "seguridad",
				title: "Cuidamos cada paso",
				description:
					"Guías bilingües, seguro de viaje, equipo certificado. Porque una gran aventura merece estar bien cuidada.",
				variant: "icon",
				icon: "shield-check",
				size: "default",
			},
			{
				id: "conexion",
				title: "Raíces que sostienen",
				description:
					"Conoce a las comunidades que hacen vivo este territorio. Turismo sustentable que respeta, celebra y devuelve.",
				variant: "text",
				size: "default",
			},
		],
	},

	gallery: {
		images: [
			{
				src: "https://picsum.photos/seed/arequipa-campina/1600/900",
				alt: "Campiña arequipeña con el Misti al fondo al amanecer",
				caption:
					"El sol nace entre los volcanes, igual que ayer, igual que hace siglos.",
				captionPosition: "bottom-left",
			},
			{
				src: "https://picsum.photos/seed/colca-condor-vuelo/1600/900",
				alt: "Cóndor andino volando sobre el Cañón del Colca",
				caption: "El vuelo del cóndor cuenta lo que los mapas no dicen.",
				captionPosition: "bottom-center",
			},
			{
				src: "https://picsum.photos/seed/sillar-arquitectura/1200/1200",
				alt: "Detalle de arquitectura en sillar, piedra volcánica blanca de Arequipa",
				caption:
					"Cada piedra tiene un nombre. Cada color, una historia que no necesita palabras.",
				captionPosition: "center",
			},
			{
				src: "https://picsum.photos/seed/arequipa-atardecer/1600/900",
				alt: "Atardecer en Arequipa con el Misti nevado al fondo",
				caption: "El sendero no termina donde termina el camino.",
				captionPosition: "bottom-left",
			},
		],
		testimonials: [
			{
				quote:
					"Una experiencia que transforma la forma de ver la montaña. Cada sendero tiene una historia y aquí saben contarla.",
				author: "María Fernanda López",
				location: "Arequipa, Perú",
			},
			{
				quote:
					"Hicimos el trekking de 2 días por el Cañón del Colca. Todo impecable: los guías, la logística, la comida. Volvemos el año que viene.",
				author: "Carlos y Patricia Mendoza",
				location: "Santiago, Chile",
			},
			{
				quote:
					"La experiencia en el Monasterio de Santa Catalina fue lo más auténtico del viaje. Aprendí más en una tarde que en años de leer.",
				author: "Sofía Reinhardt",
				location: "Berlín, Alemania",
			},
		],
		metrics: [
			{ value: 12, suffix: "", label: "rutas activas" },
			{ value: 500, suffix: "+", label: "viajeros" },
			{ value: 98, suffix: "%", label: "satisfacción" },
			{ value: 7, suffix: "", label: "años de experiencia" },
		],
	},

	cta: {
		heading: "¿Listo para tu próxima aventura?",
		subCopy:
			"No hacen falta mapas ni planes perfectos. Solo venir con ganas de descubrir.",
		primaryCta: {
			label: "Reserva tu experiencia",
			href: "mailto:reservas@rutasdelsol.com",
		},
		secondaryCta: { label: "Contáctanos", href: "mailto:info@rutasdelsol.com" },
	},

	footer: {
		brandName: "Rutas del Sol",
		tagline: "Caminos que cuentan historias",
		navLinks: [
			{ label: "Experiencias", href: "#experiencias" },
			{ label: "Itinerarios", href: "#itinerarios" },
			{ label: "Contacto", href: "#contacto" },
		],
		socialLinks: [
			{
				platform: "Instagram",
				href: "https://instagram.com/rutasdelsol",
				icon: "instagram-logo",
			},
			{
				platform: "WhatsApp",
				href: "https://wa.me/519XXXXXXXX",
				icon: "whatsapp-logo",
			},
		],
		contact: {
			email: "info@rutasdelsol.com",
			phone: "+51 9XX XXX XXX",
		},
		copyright: "2025 Rutas del Sol. Todos los derechos reservados.",
	},
};
