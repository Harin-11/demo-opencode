import { useRef, useState, useEffect, useCallback } from "react";
import {
	motion,
	useInView,
	useScroll,
	useTransform,
	AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import type {
	Content,
	Testimonial as TestimonialType,
	Metric,
} from "@/data/types";

interface GalleryProps {
	content: Content["gallery"];
}

/* ── Gallery Image with scroll-synced parallax ── */
function GalleryImage({ img }: { img: Content["gallery"]["images"][number] }) {
	const ref = useRef<HTMLDivElement>(null!);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
	const opacity = useTransform(
		scrollYProgress,
		[0, 0.3, 0.7, 1],
		[0.4, 1, 1, 0.3],
	);

	const captionInView = useInView(ref, { once: true, margin: "-20%" });

	const positionClass = (pos?: string) => {
		if (pos === "center")
			return "inset-0 flex items-center justify-center text-center";
		if (pos === "bottom-center") return "text-center";
		return "text-left";
	};

	return (
		<div
			ref={ref}
			className={cn(
				"relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-clay-950",
			)}
		>
			<motion.img
				src={img.src}
				alt={img.alt}
				loading="lazy"
				className="absolute inset-0 w-full h-full object-cover will-change-transform bg-clay-950"
				style={{ y, opacity }}
			/>

			{/* Dark gradient overlay for text readability */}
			<div className="absolute inset-0 bg-gradient-to-t from-clay-950/60 via-transparent to-transparent pointer-events-none" />

			{img.caption && (
				<motion.div
					className={cn(
						"absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16",
						positionClass(img.captionPosition),
					)}
					initial={{ opacity: 0, y: 24 }}
					animate={captionInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
				>
					<p
						className={cn(
							"text-white font-display font-bold text-xl md:text-3xl lg:text-4xl leading-tight max-w-3xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]",
							img.captionPosition === "center" ||
								img.captionPosition === "bottom-center"
								? "mx-auto"
								: "",
						)}
					>
						{img.caption}
					</p>
				</motion.div>
			)}
		</div>
	);
}

/* ── Animated Testimonials (adapted from 21st.dev/aceternity) ── */
function AnimatedTestimonials({
	testimonials,
}: {
	testimonials: TestimonialType[];
}) {
	const [active, setActive] = useState(0);

	const handleNext = useCallback(
		() => setActive((p) => (p + 1) % testimonials.length),
		[testimonials.length],
	);
	const handlePrev = useCallback(
		() => setActive((p) => (p - 1 + testimonials.length) % testimonials.length),
		[testimonials.length],
	);

	useEffect(() => {
		const timer = setInterval(handleNext, 6000);
		return () => clearInterval(timer);
	}, [handleNext]);

	return (
		<div className="max-w-3xl mx-auto">
			<div className="relative min-h-[280px] md:min-h-[260px]">
				<AnimatePresence mode="wait">
					<motion.div
						key={active}
						initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
						transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
						className="absolute inset-0"
					>
						<blockquote className="text-clay-100 font-display text-xl md:text-3xl leading-relaxed mb-6 italic">
							&ldquo;{testimonials[active].quote}&rdquo;
						</blockquote>
						<cite className="not-italic">
							<p className="text-clay-50 font-semibold text-base">
								{testimonials[active].author}
							</p>
							{testimonials[active].location && (
								<p className="text-clay-400 text-sm mt-1">
									{testimonials[active].location}
								</p>
							)}
						</cite>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Navigation dots */}
			<div className="flex items-center justify-center gap-3 mt-8">
				<button
					onClick={handlePrev}
					aria-label="Testimonio anterior"
					className="h-10 w-10 rounded-full bg-inka-gold/10 border border-inka-gold/20 flex items-center justify-center group hover:bg-inka-gold/20 transition-colors"
				>
					<IconArrowLeft className="h-5 w-5 text-inka-gold group-hover:-translate-x-0.5 transition-transform" />
				</button>

				<div className="flex gap-2 mx-2">
					{testimonials.map((_, i) => (
						<button
							key={i}
							onClick={() => setActive(i)}
							aria-label={`Ir al testimonio ${i + 1}`}
							className={cn(
								"h-2 rounded-full transition-all duration-500",
								i === active
									? "w-8 bg-inka-gold"
									: "w-2 bg-inka-gold/30 hover:bg-inka-gold/50",
							)}
						/>
					))}
				</div>

				<button
					onClick={handleNext}
					aria-label="Siguiente testimonio"
					className="h-10 w-10 rounded-full bg-inka-gold/10 border border-inka-gold/20 flex items-center justify-center group hover:bg-inka-gold/20 transition-colors"
				>
					<IconArrowRight className="h-5 w-5 text-inka-gold group-hover:translate-x-0.5 transition-transform" />
				</button>
			</div>
		</div>
	);
}

/* ── Animated Metric Counter ── */
function MetricCounter({
	metric,
	inView,
}: {
	metric: Metric;
	inView: boolean;
}) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!inView) return;
		const duration = 2000;
		const steps = 60;
		const increment = metric.value / steps;
		let current = 0;
		const timer = setInterval(() => {
			current += increment;
			if (current >= metric.value) {
				setCount(metric.value);
				clearInterval(timer);
			} else {
				setCount(Math.floor(current));
			}
		}, duration / steps);
		return () => clearInterval(timer);
	}, [inView, metric.value]);

	return (
		<div className="text-center">
			<p className="text-clay-950 font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight">
				{count}
				{metric.suffix}
			</p>
			<p className="text-clay-600 text-sm md:text-base mt-2 uppercase tracking-wider">
				{metric.label}
			</p>
		</div>
	);
}

/* ── Gallery (main export) ── */
export function Gallery({
	content: { images, testimonials, metrics },
}: GalleryProps) {
	const metricsRef = useRef<HTMLDivElement>(null!);
	const metricsInView = useInView(metricsRef, { once: true, margin: "-100px" });

	return (
		<section id="galeria" className="bg-clay-50">
			{/* Cinematic images */}
			{images.map((img, i) => (
				<GalleryImage key={i} img={img} />
			))}

			{/* Testimonials */}
			<div className="py-24 md:py-32 bg-clay-950">
				<div className="max-w-7xl mx-auto px-6 md:px-12">
					<motion.div
						className="mb-12 md:mb-16 max-w-3xl"
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
					>
						<p className="text-inka-gold text-sm uppercase tracking-[0.2em] font-medium mb-3">
							Voces del camino
						</p>
						<h2 className="text-clay-50 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
							Lo que dicen quienes{" "}
							<span className="text-inka-gold">caminaron</span>
						</h2>
					</motion.div>

					<AnimatedTestimonials testimonials={testimonials} />
				</div>
			</div>

			{/* Metrics */}
			<div className="py-20 md:py-28 bg-clay-100">
				<div className="max-w-7xl mx-auto px-6 md:px-12">
					<div
						ref={metricsRef}
						className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
					>
						{metrics.map((m, i) => (
							<MetricCounter key={i} metric={m} inView={metricsInView} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
