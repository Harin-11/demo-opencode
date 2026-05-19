import type { Content } from "./types";

export const content: Content = {
	seo: {
		title: "Rutas del Sol — Turismo Receptivo",
		description:
			"Descubrí la historia y paisajes de la región con Rutas del Sol. Trekking guiados, itinerarios cortos y experiencias culturales vivenciales.",
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
		heading: "Descubrí los caminos que cuentan historias",
		subheading:
			"Trekking guiados · Experiencias culturales · Itinerarios cortos",
		primaryCta: { label: "Explorá experiencias", href: "#experiencias" },
		secondaryCta: { label: "Ver itinerarios", href: "#itinerarios" },
		bgImage: "https://picsum.photos/seed/andean-sunset/1920/1080",
		bgImageAlt: "Paisaje andino al atardecer, montañas con luz dorada",
	},

	features: {
		cards: [
			{
				id: "trekking",
				title: "Caminos ancestrales",
				description:
					"Caminá por senderos que las montañas guardan hace siglos. La Quebrada de Humahuaca, el Cerro de los Siete Colores, los valles calchaquíes. Cada paso, una historia.",
				variant: "image",
				image: {
					src: "https://picsum.photos/seed/cerro-siete-colores/800/600",
					alt: "Cerro de los Siete Colores, Purmamarca, Jujuy",
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
					src: "https://picsum.photos/seed/sendero-andino/400/400",
					alt: "Sendero de montaña entre cardones y piedras",
				},
				size: "default",
			},
			{
				id: "cultural",
				title: "Tejé la memoria",
				description:
					"Tejé con artesanas locales, probá la cocina andina, recorré mercados tradicionales. El viaje no termina en el paisaje: entra en las manos que lo trabajan.",
				variant: "image",
				image: {
					src: "https://picsum.photos/seed/tejedora-andina/400/600",
					alt: "Artesana tejiendo en telar tradicional andino",
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
					"Conocé a las comunidades que hacen vivo este territorio. Turismo sustentable que respeta, celebra y devuelve.",
				variant: "text",
				size: "default",
			},
		],
	},

	gallery: {
		images: [
			{
				src: "https://picsum.photos/seed/montanas-doradas/1600/900",
				alt: "Cordillera de los Andes iluminada por el sol del atardecer",
				caption:
					"El sol nace entre los cerros, igual que ayer, igual que hace siglos.",
				captionPosition: "bottom-left",
			},
			{
				src: "https://picsum.photos/seed/puna-viento/1600/900",
				alt: "Puna argentina, plano infinito de arena y cielo",
				caption: "El viento en la puna cuenta lo que los mapas no dicen.",
				captionPosition: "bottom-center",
			},
			{
				src: "https://picsum.photos/seed/textile-andino/1200/1200",
				alt: "Primer plano de tejido artesanal con patrones geométricos",
				caption:
					"Cada hilado tiene un nombre. Cada color, una historia que no necesita palabras.",
				captionPosition: "center",
			},
			{
				src: "https://picsum.photos/seed/sendero-atardecer/1600/900",
				alt: "Viajero caminando por un sendero de montaña al atardecer",
				caption: "El sendero no termina donde termina el camino.",
				captionPosition: "bottom-left",
			},
		],
		testimonials: [
			{
				quote:
					"Una experiencia que transforma la forma de ver la montaña. Cada sendero tiene una historia y acá saben contarla.",
				author: "María Fernanda López",
				location: "Buenos Aires, Argentina",
			},
			{
				quote:
					"Hicimos el trekking de 2 días por la Quebrada. Todo impecable: los guías, la logística, la comida. Volvemos el año que viene.",
				author: "Carlos y Patricia Mendoza",
				location: "Santiago, Chile",
			},
			{
				quote:
					"La experiencia cultural con las artesanas fue lo más auténtico del viaje. Aprendí más en una tarde que en años de leer.",
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
			label: "Reservá tu experiencia",
			href: "mailto:reservas@rutasdelsol.com",
		},
		secondaryCta: { label: "Contactanos", href: "mailto:info@rutasdelsol.com" },
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
				href: "https://wa.me/549XXXXXXXXX",
				icon: "whatsapp-logo",
			},
		],
		contact: {
			email: "info@rutasdelsol.com",
			phone: "+54 9 XXX XXX-XXXX",
		},
		copyright: "2025 Rutas del Sol. Todos los derechos reservados.",
	},
};
