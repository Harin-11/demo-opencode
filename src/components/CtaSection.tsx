import { useRef, useState, useEffect } from "react";
import { motion, useInView, useSpring, useTransform, useMotionValue } from "framer-motion";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import type { Content, Metric } from "@/data/types";

interface CtaSectionProps {
	content: Content["cta"];
	metrics: Metric[];
}

function MetricCounter({ metric, inView }: { metric: Metric; inView: boolean }) {
	const countValue = useMotionValue(0);
	const rounded = useTransform(countValue, (latest) => Math.round(latest));
	const springValue = useSpring(countValue, { stiffness: 50, damping: 30 });
	const [display, setDisplay] = useState(0);

	useEffect(() => {
		if (inView) countValue.set(metric.value);
	}, [inView, metric.value, countValue]);

	useEffect(() => {
		return rounded.on("change", (latest) => setDisplay(latest));
	}, [rounded]);

	return (
		<div className="flex flex-col gap-1">
			<div className="text-3xl md:text-5xl font-display font-bold text-clay-950 tracking-tighter">
				{display}{metric.suffix}
			</div>
			<div className="text-[10px] uppercase tracking-[0.3em] font-bold text-clay-400">
				{metric.label}
			</div>
		</div>
	);
}

export function CtaSection({ content: cta, metrics }: CtaSectionProps) {
	const ref = useRef<HTMLElement>(null!);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section
			ref={ref}
			id="contacto"
			className="bg-clay-50 border-t border-clay-200"
		>
			<div className="max-w-7xl mx-auto px-6 md:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
					
					{/* Left: Metrics */}
					<div className="lg:col-span-4 grid grid-cols-2 gap-12 order-2 lg:order-1">
						{metrics.map((m, i) => (
							<MetricCounter key={i} metric={m} inView={isInView} />
						))}
					</div>

					{/* Right: CTA Content */}
					<div className="lg:col-span-8 order-1 lg:order-2">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
						>
							<div className="flex items-center gap-4 mb-8">
								<span className="w-10 h-[1px] bg-inka-gold/40" />
								<p className="text-inka-gold text-[10px] uppercase tracking-[0.4em] font-bold">
									Próximos pasos
								</p>
							</div>

							<h2 className="text-clay-950 font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1] tracking-tighter mb-10">
								{cta.heading}
							</h2>

							<p className="text-clay-600 text-lg md:text-xl max-w-2xl mb-12 md:mb-16 leading-relaxed font-light">
								{cta.subCopy}
							</p>

							<div className="flex flex-wrap gap-6 items-center">
								<div className="p-1 rounded-full bg-inka-gold/20 border border-inka-gold/30">
									<a
										href={cta.primaryCta.href}
										className="group/button relative inline-flex items-center justify-center rounded-full h-14 px-10 bg-inka-gold text-clay-950 font-bold text-base whitespace-nowrap transition-all shadow-xl active:scale-95 overflow-hidden"
									>
										{cta.primaryCta.label}
										<div className="ml-3 w-8 h-8 rounded-full bg-clay-950/10 flex items-center justify-center transition-transform duration-500 group-hover/button:translate-x-1">
											<IconArrowRight size={18} />
										</div>
									</a>
								</div>

								{cta.secondaryCta && (
									<a
										href={cta.secondaryCta.href}
										className="group/button inline-flex items-center justify-center rounded-full h-14 px-10 bg-white/5 border border-clay-300 text-clay-700 hover:bg-clay-100 hover:text-clay-950 transition-all active:scale-95"
									>
										{cta.secondaryCta.label}
										<IconArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-500 group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
									</a>
								)}
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
