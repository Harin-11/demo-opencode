import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once globally
gsap.registerPlugin(ScrollTrigger);

// Normalize ScrollTrigger for mobile (iOS Safari fix)
ScrollTrigger.normalizeScroll(true);

// Reduced motion detection
export const prefersReducedMotion = () =>
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fade-up utility: generic scroll-triggered entrance animation.
 * Elements start translated down + blurred + invisible, resolve on scroll.
 */
export function fadeUp(element, options = {}) {
	if (!element) return;

	const {
		delay = 0,
		duration = 0.8,
		y = 48,
		stagger = 0,
		trigger = element,
		start = "top 85%",
		toggleActions = "play none none reverse",
		scrub = false,
	} = options;

	if (prefersReducedMotion()) {
		gsap.set(element, { opacity: 1, y: 0, filter: "blur(0px)" });
		return;
	}

	gsap.fromTo(
		element,
		{ opacity: 0, y, filter: "blur(4px)" },
		{
			opacity: 1,
			y: 0,
			filter: "blur(0px)",
			duration,
			delay,
			stagger,
			ease: "power3.out",
			scrollTrigger: scrub
				? { trigger, start, end: "bottom top", scrub: 1 }
				: { trigger, start, toggleActions },
		},
	);
}

/**
 * Count-up animation for metrics
 */
export function countUp(element, target, options = {}) {
	if (!element) return;

	const { duration = 1.5, delay = 0, suffix = "" } = options;

	if (prefersReducedMotion()) {
		element.textContent = `${target}${suffix}`;
		return;
	}

	const startValue = 0;

	ScrollTrigger.create({
		trigger: element,
		start: "top 85%",
		once: true,
		onEnter: () => {
			gsap.fromTo(
				{ val: startValue },
				{ val: startValue },
				{
					val: target,
					duration,
					delay,
					ease: "power2.out",
					onUpdate: function () {
						element.textContent = `${Math.round(this.targets()[0].val)}${suffix}`;
					},
				},
			);
		},
	});
}
