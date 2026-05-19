import { useRef } from "react";
import {
	useMotionValue,
	motion,
	useMotionTemplate,
	useInView,
} from "framer-motion";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import type { Content } from "@/data/types";

interface HeroProps {
	content: Content["hero"];
}

export function Hero({ content: hero }: HeroProps) {
	const sectionRef = useRef<HTMLDivElement>(null!);
	const isInView = useInView(sectionRef, { once: true, margin: "-5%" });

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove({
		currentTarget,
		clientX,
		clientY,
	}: React.MouseEvent) {
		if (!currentTarget) return;
		const { left, top } = (
			currentTarget as HTMLElement
		).getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	const dotColor = "var(--color-inka-gold)";

	return (
		<section
			ref={sectionRef}
			id="hero"
			className="group relative min-h-[100dvh] flex items-center overflow-hidden bg-clay-950"
			onMouseMove={handleMouseMove}
		>
			{/* Background image */}
			<motion.img
				src={hero.bgImage}
				alt={hero.bgImageAlt}
				fetchPriority="high"
				className="absolute inset-0 w-full h-full object-cover select-none"
				draggable={false}
				initial={{ scale: 1.08 }}
				animate={{ scale: 1 }}
				transition={{ duration: 1.5, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
			/>

			{/* Stronger overlay for text readability */}
			<div className="absolute inset-0 bg-gradient-to-b from-clay-950/50 via-clay-950/40 to-clay-950/80" />

			{/* Dot pattern layer — always visible */}
			<div
				className="absolute inset-0 opacity-25 pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
					backgroundSize: "20px 20px",
				}}
			/>

			{/* Mouse-follow highlight */}
			<motion.div
				className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-70"
				style={{
					backgroundImage: `radial-gradient(circle, ${dotColor} 1.5px, transparent 1.5px)`,
					backgroundSize: "20px 20px",
					maskImage: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
					WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
				}}
			/>

			{/* Floating decorative particles */}
			<motion.div
				className="absolute top-1/4 left-[10%] w-16 h-16 pointer-events-none hidden lg:block"
				animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
				transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
				aria-hidden="true"
			>
				<svg viewBox="0 0 100 100" fill="none">
					<path
						d="M50 0 L100 50 L50 100 L0 50 Z"
						stroke="var(--color-inka-gold)"
						strokeWidth="0.5"
						opacity="0.3"
					/>
					<path
						d="M50 20 L70 50 L50 80 L30 50 Z"
						fill="var(--color-inka-gold)"
						opacity="0.12"
					/>
				</svg>
			</motion.div>

			<motion.div
				className="absolute bottom-1/3 right-[8%] w-12 h-12 pointer-events-none hidden lg:block"
				animate={{ y: [0, 20, 0], rotate: [0, -25, 0] }}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 2,
				}}
				aria-hidden="true"
			>
				<svg viewBox="0 0 100 100" fill="none">
					<circle
						cx="50"
						cy="50"
						r="48"
						stroke="var(--color-inka-purple)"
						strokeWidth="0.5"
						opacity="0.2"
					/>
					<circle
						cx="50"
						cy="50"
						r="25"
						fill="var(--color-inka-purple)"
						opacity="0.08"
					/>
				</svg>
			</motion.div>

			{/* Content */}
			<motion.div
				className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12"
				initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
				animate={
					isInView
						? { opacity: 1, y: 0, filter: "blur(0px)" }
						: { opacity: 0, y: 50, filter: "blur(10px)" }
				}
				transition={{ duration: 1.0, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
			>
				<div className="max-w-4xl">
					<motion.p
						className="text-inka-gold text-sm uppercase tracking-[0.25em] font-medium mb-4 md:mb-6"
						initial={{ opacity: 0, y: 16 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
						transition={{ duration: 0.7, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
					>
						Turismo receptivo · Perú
					</motion.p>

					<motion.h1
						className="text-white font-display font-bold leading-[1.05] tracking-tight text-[clamp(2.8rem,5.5vw,5.5rem)] md:text-[clamp(4rem,7vw,6.5rem)] mb-4 md:mb-6 max-w-5xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{
							duration: 0.8,
							delay: 0.8,
							ease: [0.32, 0.72, 0, 1],
						}}
					>
						{hero.heading}
					</motion.h1>

					<motion.p
						className="text-white/85 text-lg md:text-xl font-light max-w-2xl mb-8 md:mb-10 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
						initial={{ opacity: 0, y: 16 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
						transition={{ duration: 0.7, delay: 1.0, ease: [0.32, 0.72, 0, 1] }}
					>
						{hero.subheading}
					</motion.p>

					<motion.div
						className="flex flex-wrap gap-4 items-center"
						initial={{ opacity: 0, y: 16 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
						transition={{
							duration: 0.7,
							delay: 1.2,
							ease: [0.32, 0.72, 0, 1],
						}}
					>
						<a
							href={hero.primaryCta.href}
							className="group/button inline-flex shrink-0 items-center justify-center rounded-full h-13 px-8 bg-inka-gold text-clay-950 hover:bg-inka-gold-light font-semibold text-base whitespace-nowrap transition-all select-none shadow-[0_4px_20px_rgba(212,160,23,0.3)] hover:shadow-[0_6px_28px_rgba(212,160,23,0.45)]"
						>
							{hero.primaryCta.label}
							<IconArrowRight className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 group-hover/button:translate-x-1.5" />
						</a>
						<a
							href={hero.secondaryCta.href}
							className="group/button inline-flex shrink-0 items-center justify-center rounded-full h-13 px-8 bg-white/10 backdrop-blur-sm border border-white/25 text-white hover:bg-white/20 hover:border-white/40 font-medium text-base whitespace-nowrap transition-all select-none"
						>
							{hero.secondaryCta.label}
							<IconArrowUpRight className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
						</a>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
