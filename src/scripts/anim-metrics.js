import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./anim-utils";

/**
 * Count-up animation for metrics row
 */
export function animateMetrics(container) {
	if (!container) return;

	const items = container.querySelectorAll("[data-metric]");
	if (!items.length) return;

	items.forEach((item) => {
		const valueEl = item.querySelector("[data-metric-value]");
		const labelEl = item.querySelector("[data-metric-label]");
		if (!valueEl) return;

		const target = parseInt(valueEl.dataset.metricTarget || "0", 10);
		const suffix = valueEl.dataset.metricSuffix || "";

		if (prefersReducedMotion()) {
			valueEl.textContent = `${target}${suffix}`;
			return;
		}

		ScrollTrigger.create({
			trigger: item,
			start: "top 85%",
			once: true,
			onEnter: () => {
				gsap.fromTo(
					{ val: 0 },
					{ val: 0 },
					{
						val: target,
						duration: 1.5,
						ease: "power2.out",
						onUpdate: function () {
							const current = Math.round(this.targets()[0].val);
							valueEl.textContent = `${current}${suffix}`;
						},
					},
				);
			},
		});
	});
}
