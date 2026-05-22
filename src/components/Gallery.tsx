import { useRef, useState, useCallback } from "react";
import {
	motion,
	useInView,
	useScroll,
	useTransform,
	AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { IconArrowLeft, IconArrowRight, IconQuote } from "@tabler/icons-react";
import type { Content, Testimonial as TestimonialType } from "@/data/types";

interface GalleryProps {
	content: Content["gallery"];
}

/* ── Gallery Image with cinematic entry reveal ── */
function GalleryImage({ img }: { img: Content["gallery"]["images"][number] }) {
	const ref = useRef<HTMLDivElement>(null!);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

	const isInView = useInView(ref, { once: true, margin: "-10%" });

	const positionClass = (pos?: string) => {
		if (pos === "center")
			return "inset-0 flex items-center justify-center text-center";
		if (pos === "bottom-center") return "text-center";
		return "text-left";
	};

	return (
		<div
			ref={ref}
			className="relative w-full min-h-[60vh] md:min-h-[80vh] overflow-hidden bg-clay-950 flex items-center justify-center py-10"
		>
			<motion.div
				className="absolute inset-0 w-full h-full will-change-transform"
				style={{ opacity, scale }}
			>
				<img
					src={img.src}
					alt={img.alt}
					loading="lazy"
					className="w-full h-full object-cover"
				/>
				{/* Animation Overlay (Curtain) */}
				<motion.div
					className="absolute inset-0 bg-clay-950 z-20"
					initial={{ scaleX: 1 }}
					animate={isInView ? { scaleX: 0 } : {}}
					transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
					style={{ originX: 0 }}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-clay-950/70 via-clay-950/20 to-transparent pointer-events-none" />
			</motion.div>

			{img.caption && (
				<motion.div
					className={cn(
						"absolute bottom-0 left-0 right-0 p-8 md:p-20 z-10",
						positionClass(img.captionPosition),
					)}
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
				>
					<p
						className={cn(
							"text-white font-display font-bold text-3xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tighter max-w-4xl",
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

/* ── Redesigned Testimonials (Fixed mobile overlap) ── */
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

	return (
		<div className="relative mt-12 md:mt-32">
			{/* Layout Wrapper: Stacked on mobile, overlapped on desktop */}
			<div className="flex flex-col md:block relative h-auto md:h-[480px] overflow-hidden rounded-[3rem] bg-clay-900 border border-white/5">
				{/* Image Container */}
				<div className="relative h-[240px] md:h-full w-full overflow-hidden">
					<AnimatePresence mode="popLayout">
						<motion.div
							key={active}
							initial={{ opacity: 0, scale: 1.1 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
							className="absolute inset-0"
						>
							<img
								src={
									testimonials[active].avatar ||
									`https://picsum.photos/seed/portrait-${active}/800/1000`
								}
								alt={testimonials[active].author}
								className="w-full h-full object-cover grayscale-[0.3]"
							/>
							<div className="absolute inset-0 bg-gradient-to-r from-clay-950 via-clay-950/40 to-transparent hidden md:block" />
							<div className="absolute inset-0 bg-gradient-to-t from-clay-950 via-transparent to-transparent" />
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Content Container */}
				<div className="relative md:absolute inset-0 flex flex-col md:flex-row items-center p-8 md:p-0">
					<div className="max-w-7xl mx-auto px-0 md:px-20 w-full grid grid-cols-1 md:grid-cols-2 gap-12">
						<div className="relative z-10">
							<motion.div
								key={`quote-${active}`}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.8,
									delay: 0.4,
									ease: [0.32, 0.72, 0, 1],
								}}
							>
								<IconQuote
									size={48}
									className="text-inka-gold mb-6 md:mb-8 opacity-40"
								/>
								<blockquote className="text-white font-display text-lg md:text-3xl lg:text-4xl leading-[1.2] tracking-tighter mb-5 md:mb-8 italic">
									&ldquo;{testimonials[active].quote}&rdquo;
								</blockquote>
								<cite className="not-italic flex items-center gap-4 md:gap-6">
									<div className="h-[1px] w-8 md:w-12 bg-inka-gold" />
									<div>
										<p className="text-white font-display font-bold text-lg md:text-xl tracking-tight">
											{testimonials[active].author}
										</p>
										<p className="text-inka-gold/70 text-xs md:text-base mt-1 uppercase tracking-[0.3em] font-bold">
											{testimonials[active].location}
										</p>
									</div>
								</cite>
							</motion.div>
						</div>
					</div>

					{/* Controls Overlay */}
					<div className="mt-12 md:mt-0 md:absolute bottom-12 right-0 md:right-12 flex items-center gap-6 md:gap-8 z-20">
						<div className="flex flex-col items-end gap-2">
							<p className="text-white/40 font-mono text-[10px] md:text-sm tracking-widest uppercase">
								Viajeros
							</p>
							<div className="flex gap-1.5 md:gap-2">
								{testimonials.map((_, i) => (
									<div
										key={i}
										className={cn(
											"h-1 transition-all duration-500 rounded-full",
											i === active
												? "w-6 md:w-8 bg-inka-gold"
												: "w-2 md:w-3 bg-white/20",
										)}
									/>
								))}
							</div>
						</div>
						<div className="flex gap-3 md:gap-4">
							<button
								onClick={handlePrev}
								className="h-14 w-14 md:h-16 md:w-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-clay-950 transition-all active:scale-95"
							>
								<IconArrowLeft size={24} />
							</button>
							<button
								onClick={handleNext}
								className="h-14 w-14 md:h-16 md:w-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-clay-950 transition-all active:scale-95"
							>
								<IconArrowRight size={24} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/* ── Gallery (main export) ── */
export function Gallery({ content: { images, testimonials } }: GalleryProps) {
	return (
		<section id="galeria" className="p-0 bg-clay-50 overflow-hidden">
			{/* Cinematic focused images */}
			<div className="flex flex-col">
				{images.map((img, i) => (
					<GalleryImage key={i} img={img} />
				))}
			</div>

			{/* Testimonials */}
			<div className="py-24 md:py-32 bg-clay-950 overflow-hidden relative">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-inka-gold/[0.05] rounded-full blur-[160px] pointer-events-none" />

				<div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
					<motion.div
						className="text-center md:text-left max-w-4xl"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
					>
						<p className="text-inka-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6">
							Voces del camino
						</p>
						<h2 className="text-white font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-tighter">
							Historias que <span className="text-inka-gold">inspiran</span> a
							seguir
						</h2>
					</motion.div>

					<AnimatedTestimonials testimonials={testimonials} />
				</div>
			</div>
		</section>
	);
}
