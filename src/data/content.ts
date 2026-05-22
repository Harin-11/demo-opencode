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
		bgImage: "https://picsum.photos/seed/arequipa-misti-high/1920/1080",
		bgImageAlt:
			"Vista majestuosa del volcán Misti dominando el horizonte de Arequipa al amanecer",
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
					src: "https://picsum.photos/seed/colca-trek-1/800/600",
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
					src: "https://picsum.photos/seed/andes-view-1/800/800",
					alt: "Viajero contemplando la inmensidad de los Andes",
				},
				size: "default",
			},
			{
				id: "cultural",
				title: "Teje la memoria",
				description:
					"Visita el Monasterio de Santa Catalina, prueba la cocina arequipeña, recorre la Ruta del Sillar. El viaje no termina en el paisaje.",
				variant: "image",
				image: {
					src: "https://picsum.photos/seed/santa-catalina-arch/400/800",
					alt: "Monasterio de Santa Catalina, calles coloridas de Arequipa",
				},
				size: "tall",
			},
			{
				id: "seguridad",
				title: "Cuidamos cada paso",
				description:
					"Guías certificados, seguro de viaje y equipo de primer nivel. Tu seguridad es nuestra prioridad en cada ruta.",
				variant: "image",
				image: {
					src: "https://picsum.photos/seed/mountain-safety/800/400",
					alt: "Equipo de montaña profesional y guías expertos",
				},
				size: "wide",
			},
			{
				id: "conexion",
				title: "Raíces vivas",
				description:
					"Conoce a las comunidades que hacen vivo este territorio. Turismo sustentable que respeta y celebra la cultura local.",
				variant: "image",
				image: {
					src: "https://picsum.photos/seed/local-culture/800/800",
					alt: "Encuentro cultural con tejedores locales en los Andes",
				},
				size: "default",
			},
		],
	},

	itineraries: {
		title: "Itinerarios de autor",
		subtitle: "Rutas diseñadas para descubrir el alma de Arequipa y sus alrededores",
		items: [
			{
				id: "colca-clasico",
				title: "Esencia del Colca",
				duration: "2 Días / 1 Noche",
				description: "Un viaje profundo al corazón del cañón más profundo del mundo. Avistamiento de cóndores, baños termales y pueblos tradicionales.",
				image: "https://picsum.photos/seed/colca-condor-classic/800/1000",
				highlights: ["Cruz del Cóndor", "Baños Termales La Calera", "Caminata por Yanque"]
			},
			{
				id: "sillar-y-tradicion",
				title: "Ruta del Sillar",
				duration: "Medio Día",
				description: "Descubre el origen de la 'Ciudad Blanca'. Visita las canteras de piedra volcánica y aprende sobre la arquitectura colonial.",
				image: "https://picsum.photos/seed/sillar-quarry/800/1000",
				highlights: ["Canteras de Añashuayco", "Quebrada de Culebrillas", "Petroglifos ancestrales"]
			},
			{
				id: "misti-trek",
				title: "Ascenso al Misti",
				duration: "2 Días / 1 Noche",
				description: "El desafío definitivo para los amantes de la montaña. Conquista la cima del guardián de la ciudad a 5,822 m.s.n.m.",
				image: "https://picsum.photos/seed/misti-volcano-climb/800/1000",
				highlights: ["Campamento base Nido de Águilas", "Vista panorámica de Arequipa", "Cima del volcán"]
			},
			{
				id: "arequipa-gastronomica",
				title: "Sabor y Cultura",
				duration: "Full Day",
				description: "Un recorrido por los mercados locales y las picanterías tradicionales para descubrir por qué Arequipa es la capital culinaria.",
				image: "https://picsum.photos/seed/peruvian-food-culture/800/1000",
				highlights: ["Mercado de San Camilo", "Picanterías tradicionales", "Monasterio de Santa Catalina"]
			}
		]
	},

	gallery: {
		images: [
			{
				src: "https://picsum.photos/seed/arequipa-valley/1600/900",
				alt: "Campiña arequipeña con el Misti al fondo al amanecer",
				caption:
					"El sol nace entre los volcanes, igual que ayer, igual que hace siglos.",
				captionPosition: "bottom-left",
			},
			{
				src: "https://picsum.photos/seed/condor-flight/1600/900",
				alt: "Cóndor andino volando sobre el Cañón del Colca",
				caption: "El vuelo del cóndor cuenta lo que los mapas no dicen.",
				captionPosition: "bottom-center",
			},
			{
				src: "https://picsum.photos/seed/inca-stones/1200/1200",
				alt: "Arquitectura tradicional en los Andes",
				caption:
					"Cada piedra tiene un nombre. Cada color, una historia que no necesita palabras.",
				captionPosition: "center",
			},
			{
				src: "https://picsum.photos/seed/misti-sunset/1600/900",
				alt: "Atardecer en Arequipa con el Misti nevado al fondo",
				caption: "El sendero no termina donde termina el camino.",
				captionPosition: "bottom-left",
			},
		],
		testimonials: [
			{
				quote:
					"Una experiencia que transforma la forma de ver la montaña. Cada sendero tiene una historia y aquí saben contarla.",
				author: "Valentina Rivera",
				location: "Bogotá, Colombia",
				avatar: "https://picsum.photos/seed/portrait-1/800/1000"
			},
			{
				quote:
					"Hicimos el trekking por el Cañón del Colca. Todo impecable: los guías, la logística y la conexión con la gente local.",
				author: "Julian & Sarah Miller",
				location: "Portland, USA",
				avatar: "https://picsum.photos/seed/portrait-2/800/1000"
			},
			{
				quote:
					"La ruta del sillar y el Monasterio fueron reveladores. Es un viaje a las manos que construyeron esta ciudad blanca.",
				author: "Marcus Thorne",
				location: "Londres, UK",
				avatar: "https://picsum.photos/seed/portrait-3/800/1000"
			},
		],
		metrics: [
			{ value: 12, suffix: "", label: "rutas activas" },
			{ value: 500, suffix: "+", label: "viajeros" },
			{ value: 98, suffix: "%", label: "satisfacción" },
			{ value: 7, suffix: "", label: "años de experiencia" },
		],
		partners: [
			"National Geographic",
			"Travel + Leisure",
			"Lonely Planet",
			"Condé Nast Traveler",
			"The New York Times",
			"BBC Travel",
			"Rough Guides",
			"Adventure Travel",
		]
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
