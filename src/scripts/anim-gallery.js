import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./anim-utils";

/**
 * Parallax image scale + caption reveal for gallery images
 */
export function animateGalleryImages(section) {
	if (!section) return;

	const images = section.querySelectorAll("[data-gallery-image]");

	images.forEach((img) => {
		const el = img.querySelector("img");
		const caption = img.querySelector("[data-gallery-caption]");

		if (!el) return;

		if (prefersReducedMotion()) {
			gsap.set(el, { scale: 1, opacity: 1 });
			if (caption) gsap.set(caption, { opacity: 1, y: 0 });
			return;
		}

		// Image scale on scroll entry
		gsap.fromTo(
			el,
			{ scale: 0.8 },
			{
				scale: 1,
				ease: "none",
				scrollTrigger: {
					trigger: img,
					start: "top 85%",
					end: "center center",
					scrub: 1,
				},
			},
		);

		// Caption reveal
		if (caption) {
			ScrollTrigger.create({
				trigger: img,
				start: "center 60%",
				once: true,
				onEnter: () => {
					gsap.to(caption, {
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: "power2.out",
					});
				},
			});
		}
	});
}

/**
 * Testimonial staggered fade-up (simpler, more reliable)
 */
export function animateTestimonials(container) {
	if (!container) return;

	const cards = container.querySelectorAll("[data-testimonial-card]");
	if (!cards.length) return;

	if (prefersReducedMotion()) {
		gsap.set(cards, { opacity: 1, y: 0 });
		return;
	}

	gsap.fromTo(
		cards,
		{ opacity: 0, y: 48 },
		{
			opacity: 1,
			y: 0,
			duration: 0.7,
			stagger: 0.3,
			ease: "power3.out",
			scrollTrigger: {
				trigger: container,
				start: "top 85%",
				toggleActions: "play none none reverse",
			},
		},
	);
}
