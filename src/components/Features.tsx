import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Content, FeatureCard as FeatureCardType } from "@/data/types";

interface FeaturesProps {
	content: Content["features"];
}

function sizeClasses(size: FeatureCardType["size"]): string {
	switch (size) {
		case "wide":
			return "md:col-span-2";
		case "tall":
			return "md:row-span-2";
		case "large":
			return "md:col-span-2 md:row-span-2";
		default:
			return "";
	}
}

function FeatureCard({
	card,
	index,
}: {
	card: FeatureCardType;
	index: number;
}) {
	const ref = useRef<HTMLDivElement>(null!);
	const isInView = useInView(ref, { once: true, margin: "-80px" });
	const [tilt, setTilt] = useState({ x: 0, y: 0 });

	function handleMouseMove(e: React.MouseEvent) {
		const card = e.currentTarget as HTMLElement;
		const rect = card.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;
		setTilt({ x: y * -4, y: x * 4 });
	}

	function handleMouseLeave() {
		setTilt({ x: 0, y: 0 });
	}

	return (
		<motion.div
			ref={ref}
			className={cn(sizeClasses(card.size))}
			initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
			animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			transition={{
				duration: 0.8,
				delay: 0.3 + index * 0.12,
				ease: [0.32, 0.72, 0, 1],
			}}
		>
			<motion.div
				className="p-1.5 rounded-[2rem] bg-clay-200/60 border border-clay-200 h-full group cursor-pointer transition-shadow duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
				style={{
					rotateX: tilt.x,
					rotateY: tilt.y,
					transformStyle: "preserve-3d",
				}}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				<div className="rounded-[calc(2rem-0.375rem)] bg-clay-50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] h-full overflow-hidden">
					{card.variant === "image" && card.image && (
						<div className="relative h-full min-h-[300px]">
							<motion.img
								src={card.image.src}
								alt={card.image.alt}
								loading="lazy"
								className="absolute inset-0 w-full h-full object-cover"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
							/>
							{/* Stronger gradient overlay for text readability */}
							<div className="absolute inset-0 bg-gradient-to-t from-clay-950/85 via-clay-950/35 to-clay-950/5" />
							<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
								<h3 className="text-white font-display font-bold text-xl md:text-2xl mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
									{card.title}
								</h3>
								<p className="text-white/85 text-sm md:text-base leading-relaxed max-w-md drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
									{card.description}
								</p>
							</div>
						</div>
					)}

					{(card.variant === "text" || card.variant === "icon") && (
						<div className="p-6 md:p-8 flex flex-col justify-center h-full">
							{card.variant === "icon" && (
								<motion.div
									className="w-14 h-14 rounded-full bg-inka-gold/10 flex items-center justify-center mb-4"
									whileHover={{
										scale: 1.1,
										backgroundColor: "rgba(212,160,23,0.2)",
									}}
									transition={{ duration: 0.3 }}
								>
									<svg
										className="w-7 h-7 text-inka-gold"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
									</svg>
								</motion.div>
							)}
							<h3 className="text-clay-950 font-display font-bold text-xl md:text-2xl mb-2 group-hover:text-clay-900 transition-colors duration-300">
								{card.title}
							</h3>
							<p className="text-clay-700 text-sm md:text-base leading-relaxed">
								{card.description}
							</p>
						</div>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
}

export function Features({ content: { cards } }: FeaturesProps) {
	return (
		<>
			<span id="itinerarios" className="block" aria-hidden="true" />

			<section
				id="experiencias"
				className="py-28 md:py-36 bg-clay-50 relative overflow-hidden"
			>
				{/* Subtle decorative background */}
				<div
					className="absolute top-0 right-0 w-[400px] h-[400px] bg-inka-gold/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
					aria-hidden="true"
				/>

				<div className="max-w-7xl mx-auto px-6 md:px-12">
					{/* Section header with animated line */}
					<motion.div
						className="mb-14 md:mb-20 max-w-3xl"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
					>
						<div className="flex items-center gap-4 mb-4">
							<motion.div
								className="h-[2px] bg-inka-gold/60"
								initial={{ width: 0 }}
								whileInView={{ width: 40 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.8,
									delay: 0.3,
									ease: [0.32, 0.72, 0, 1],
								}}
							/>
							<p className="text-inka-gold text-sm uppercase tracking-[0.2em] font-medium">
								Experiencias
							</p>
						</div>
						<h2 className="text-clay-950 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
							Vive la <span className="text-inka-gold">cordillera</span> en cada
							paso
						</h2>
					</motion.div>

					{/* Bento grid */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:grid-flow-dense bg-clay-50">
						{cards.map((card, i) => (
							<FeatureCard key={card.id} card={card} index={i} />
						))}
					</div>
				</div>
			</section>
		</>
	);
}
