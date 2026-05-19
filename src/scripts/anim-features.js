import { gsap } from "gsap";
import { prefersReducedMotion } from "./anim-utils";

export function animateFeatures(section) {
	if (!section) return;

	const cards = section.querySelectorAll("[data-feature-card]");
	if (!cards.length) return;

	if (prefersReducedMotion()) {
		gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
		return;
	}

	gsap.fromTo(
		cards,
		{ opacity: 0, y: 48, scale: 0.95 },
		{
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 0.7,
			stagger: 0.15,
			ease: "power3.out",
			scrollTrigger: {
				trigger: section,
				start: "top 85%",
				toggleActions: "play none none reverse",
			},
		},
	);
}
