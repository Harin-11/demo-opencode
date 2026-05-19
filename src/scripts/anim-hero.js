import { gsap } from "gsap";
import { prefersReducedMotion } from "./anim-utils";

export function animateHero(heroSection) {
	if (!heroSection) return;

	const heading = heroSection.querySelector("[data-hero-heading]");
	const subheading = heroSection.querySelector("[data-hero-subheading]");
	const primaryCta = heroSection.querySelector("[data-hero-cta-primary]");
	const secondaryCta = heroSection.querySelector("[data-hero-cta-secondary]");
	const bgImage = heroSection.querySelector("[data-hero-bg]");
	const decorative = heroSection.querySelector("[data-hero-decorative]");
	const content = heroSection.querySelector("[data-hero-content]");

	if (prefersReducedMotion()) {
		gsap.set([heading, subheading, primaryCta, secondaryCta, decorative], {
			opacity: 1,
			y: 0,
			filter: "blur(0px)",
		});
		return;
	}

	const tl = gsap.timeline();

	// Decorative element
	if (decorative) {
		tl.fromTo(
			decorative,
			{ opacity: 0, scale: 0.8 },
			{ opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
			0.1,
		);
	}

	// Heading
	if (heading) {
		tl.fromTo(
			heading,
			{ opacity: 0, y: 64, filter: "blur(8px)" },
			{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				duration: 0.8,
				ease: "power3.out",
			},
			0.2,
		);
	}

	// Subheading
	if (subheading) {
		tl.fromTo(
			subheading,
			{ opacity: 0, y: 32 },
			{ opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
			0.5,
		);
	}

	// Primary CTA
	if (primaryCta) {
		tl.fromTo(
			primaryCta,
			{ opacity: 0, y: 24 },
			{ opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
			0.75,
		);
	}

	// Secondary CTA
	if (secondaryCta) {
		tl.fromTo(
			secondaryCta,
			{ opacity: 0, y: 24 },
			{ opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
			0.9,
		);
	}

	// Scroll exit: background scale + content fade
	if (bgImage && content) {
		gsap.to(bgImage, {
			scale: 1.05,
			ease: "none",
			scrollTrigger: {
				trigger: heroSection,
				start: "top top",
				end: "bottom top",
				scrub: 1,
			},
		});

		gsap.to(content, {
			opacity: 0.6,
			y: -40,
			ease: "none",
			scrollTrigger: {
				trigger: heroSection,
				start: "top top",
				end: "bottom top",
				scrub: 1,
			},
		});
	}
}
