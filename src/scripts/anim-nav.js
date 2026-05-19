import { gsap } from "gsap";
import { prefersReducedMotion } from "./anim-utils";

/**
 * Nav entrance: slide down with mask reveal on page load
 */
export function animateNav(navElement) {
	if (!navElement) return;

	if (prefersReducedMotion()) {
		gsap.set(navElement, { opacity: 1, y: 0 });
		return;
	}

	gsap.fromTo(
		navElement,
		{ opacity: 0, y: -40 },
		{ opacity: 1, y: 0, duration: 0.5, delay: 1.2, ease: "power3.out" },
	);
}

/**
 * Hamburger morph to X + menu toggle
 */
export function setupMobileNav(hamburgerBtn, menuOverlay, links) {
	if (!hamburgerBtn || !menuOverlay) return;

	const isOpen = { value: false };
	const lines = hamburgerBtn.querySelectorAll("span");

	function openMenu() {
		isOpen.value = true;
		gsap.to(menuOverlay, {
			opacity: 1,
			visibility: "visible",
			duration: 0.3,
			ease: "power2.out",
		});
		if (lines[0]) gsap.to(lines[0], { rotate: 45, y: 8 });
		if (lines[1]) gsap.to(lines[1], { opacity: 0 });
		if (lines[2]) gsap.to(lines[2], { rotate: -45, y: -8 });

		if (links?.length) {
			gsap.fromTo(
				links,
				{ opacity: 0, y: 24 },
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
					stagger: 0.1,
					delay: 0.2,
					ease: "power2.out",
				},
			);
		}
	}

	function closeMenu() {
		isOpen.value = false;
		gsap.to(menuOverlay, {
			opacity: 0,
			visibility: "hidden",
			duration: 0.2,
			ease: "power2.in",
		});
		if (lines[0]) gsap.to(lines[0], { rotate: 0, y: 0 });
		if (lines[1]) gsap.to(lines[1], { opacity: 1 });
		if (lines[2]) gsap.to(lines[2], { rotate: 0, y: 0 });
	}

	hamburgerBtn.addEventListener("click", () => {
		isOpen.value ? closeMenu() : openMenu();
	});

	// Close menu when clicking a link
	if (links?.length) {
		links.forEach((link) => {
			link.addEventListener("click", closeMenu);
		});
	}
}

/**
 * Active section tracking via IntersectionObserver
 * Works for both desktop AND mobile nav links
 */
export function setupActiveSection(allLinks) {
	if (!allLinks?.length) return;

	const sections = allLinks
		.map((link) => document.querySelector(link.getAttribute("href")))
		.filter(Boolean);

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.id;
					allLinks.forEach((link) => {
						const isActive = link.getAttribute("href") === `#${id}`;
						link.classList.toggle("text-inka-gold", isActive);
						link.classList.toggle(
							"text-clay-400",
							!isActive && !link.closest("#mobile-menu"),
						);
						link.classList.toggle(
							"text-clay-300",
							!isActive && !!link.closest("#mobile-menu"),
						);
					});
				}
			});
		},
		{ threshold: 0.3 },
	);

	sections.forEach((section) => observer.observe(section));
}
