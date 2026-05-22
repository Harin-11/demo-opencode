export interface NavLink {
	label: string;
	href: string;
}

export interface CTA {
	label: string;
	href: string;
}

export interface FeatureCardImage {
	src: string;
	alt: string;
}

export type FeatureCardVariant = "image" | "text" | "icon" | "decorative";
export type FeatureCardSize = "default" | "wide" | "tall" | "large";

export interface FeatureCard {
	id: string;
	title: string;
	description: string;
	variant: FeatureCardVariant;
	image?: FeatureCardImage;
	icon?: string;
	patternSvg?: string;
	size: FeatureCardSize;
}

export interface GalleryImage {
	src: string;
	alt: string;
	caption?: string;
	captionPosition?: "bottom-left" | "bottom-center" | "center";
}

export interface Testimonial {
	quote: string;
	author: string;
	location?: string;
	avatar?: string;
}

export interface Itinerary {
	id: string;
	title: string;
	duration: string;
	description: string;
	image: string;
	highlights: string[];
}

export interface Metric {
	value: number;
	suffix?: string;
	label: string;
}

export interface SocialLink {
	platform: string;
	href: string;
	icon: string;
}

export interface Contact {
	email?: string;
	phone?: string;
}

export interface Content {
	nav: {
		brandName: string;
		links: NavLink[];
	};
	hero: {
		heading: string;
		subheading: string;
		primaryCta: CTA;
		secondaryCta: CTA;
		bgImage: string;
		bgImageAlt: string;
	};
	features: {
		cards: FeatureCard[];
	};
	itineraries: {
		title: string;
		subtitle: string;
		items: Itinerary[];
	};
	gallery: {
		images: GalleryImage[];
		testimonials: Testimonial[];
		metrics: Metric[];
		partners?: string[];
	};
	cta: {
		heading: string;
		subCopy: string;
		primaryCta: CTA;
		secondaryCta?: CTA;
	};
	footer: {
		brandName: string;
		tagline: string;
		navLinks: NavLink[];
		socialLinks: SocialLink[];
		contact: Contact;
		copyright: string;
	};
	seo: {
		title: string;
		description: string;
	};
}
