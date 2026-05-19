import { gsap } from "gsap";
import { prefersReducedMotion } from "./anim-utils";

export function animateCta(section) {
	if (!section) return;

	const heading = section.querySelector("[data-cta-heading]");
	const subCopy = section.querySelector("[data-cta-subcopy]");
	const buttons = section.querySelectorAll("[data-cta-button]");

	if (prefersReducedMotion()) {
		gsap.set([heading, subCopy, buttons], { opacity: 1, y: 0 });
		return;
	}

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: section,
			start: "top 85%",
			toggleActions: "play none none reverse",
		},
	});

	tl.fromTo(
		section,
		{ opacity: 0 },
		{ opacity: 1, duration: 0.5, ease: "power1.out" },
	)
		.fromTo(
			heading,
			{ opacity: 0, y: 48 },
			{ opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
			"+=0.1",
		)
		.fromTo(
			subCopy,
			{ opacity: 0, y: 24 },
			{ opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
			"+=0.2",
		);

	if (buttons.length) {
		tl.fromTo(
			buttons,
			{ opacity: 0, y: 24 },
			{ opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
			"+=0.15",
		);
	}
}
