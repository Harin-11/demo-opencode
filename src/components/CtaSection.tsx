import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import type { Content } from "@/data/types";

interface CtaSectionProps {
	content: Content["cta"];
}

export function CtaSection({ content: cta }: CtaSectionProps) {
	const ref = useRef<HTMLElement>(null!);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section
			ref={ref}
			id="contacto"
			className="py-28 md:py-40 bg-clay-50 relative overflow-hidden"
		>
			{/* Ambient decorative blobs with animation */}
			<div className="absolute inset-0 pointer-events-none" aria-hidden="true">
				<motion.div
					className="absolute top-0 right-0 w-[500px] h-[500px] bg-inka-gold/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
					animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
					transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
				/>
				<motion.div
					className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-inka-purple/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
					animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
					transition={{
						duration: 15,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 3,
					}}
				/>
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left">
				<div className="max-w-4xl mx-auto md:mx-0">
					<motion.p
						className="text-inka-gold text-sm uppercase tracking-[0.2em] font-medium mb-3"
						initial={{ opacity: 0, y: 12 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
					>
						Contacto
					</motion.p>

					<motion.h2
						className="text-clay-950 font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-6"
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
					>
						{cta.heading}
					</motion.h2>

					<motion.p
						className="text-clay-700 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
						initial={{ opacity: 0, y: 12 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
					>
						{cta.subCopy}
					</motion.p>

					<motion.div
						className="flex flex-wrap gap-4 items-center justify-center md:justify-start"
						initial={{ opacity: 0, y: 12 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
					>
						<a
							href={cta.primaryCta.href}
							className="group/button inline-flex shrink-0 items-center justify-center rounded-full h-12 px-8 bg-inka-gold text-clay-950 hover:bg-inka-gold-light font-medium text-base whitespace-nowrap transition-all select-none"
						>
							{cta.primaryCta.label}
							<IconArrowRight className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 group-hover/button:translate-x-1" />
						</a>
						{cta.secondaryCta && (
							<a
								href={cta.secondaryCta.href}
								className="group/button inline-flex shrink-0 items-center justify-center rounded-full h-12 px-8 bg-transparent border border-clay-400 text-clay-800 hover:bg-clay-100 hover:text-clay-950 hover:border-clay-600 font-medium text-base whitespace-nowrap transition-all select-none"
							>
								{cta.secondaryCta.label}
								<IconArrowUpRight className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
							</a>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
