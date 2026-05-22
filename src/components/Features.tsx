import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
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
	onOpen,
}: {
	card: FeatureCardType;
	index: number;
	onOpen: (card: FeatureCardType) => void;
}) {
	const ref = useRef<HTMLDivElement>(null!);
	const isInView = useInView(ref, { once: true, margin: "-40px" });
	const [tilt, setTilt] = useState({ x: 0, y: 0 });

	function handleMouseMove(e: React.MouseEvent) {
		const card = e.currentTarget as HTMLElement;
		const rect = card.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;
		setTilt({ x: y * -6, y: x * 6 });
	}

	function handleMouseLeave() {
		setTilt({ x: 0, y: 0 });
	}

	return (
		<motion.div
			ref={ref}
			className={cn(
				sizeClasses(card.size),
				"relative h-full shrink-0 snap-start w-[85vw] md:w-full",
			)}
			initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
			animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			transition={{
				duration: 0.8,
				delay: index * 0.1,
				ease: [0.32, 0.72, 0, 1],
			}}
			onClick={() => onOpen(card)}
		>
			<motion.div
				className="p-2 rounded-[2.5rem] bg-clay-200/40 border border-clay-200/50 h-full group cursor-pointer overflow-hidden"
				style={{
					rotateX: tilt.x,
					rotateY: tilt.y,
					transformStyle: "preserve-3d",
				}}
				animate={{
					rotateX: tilt.x,
					rotateY: tilt.y,
				}}
				transition={{ type: "spring", stiffness: 100, damping: 20 }}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				<div className="rounded-[calc(2.5rem-0.5rem)] bg-clay-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] h-full overflow-hidden relative">
					{card.image && (
						<div className="relative h-full min-h-[300px] md:min-h-[240px]">
							<motion.img
								src={card.image.src}
								alt={card.image.alt}
								loading="lazy"
								className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-clay-950/80 via-clay-950/20 to-transparent" />

							<div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex flex-col justify-end h-full">
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={isInView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
								>
									<h3 className="text-white font-display font-bold text-2xl md:text-3xl mb-3 tracking-tight">
										{card.title}
									</h3>
									<p className="text-white/70 text-sm md:text-base leading-relaxed max-w-sm">
										{card.description}
									</p>
								</motion.div>
							</div>
						</div>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
}

export function Features({ content: { cards } }: FeaturesProps) {
	const [selected, setSelected] = useState<FeatureCardType | null>(null);
	const scrollRef = useRef<HTMLDivElement>(null!);
	const [activeIndex, setActiveIndex] = useState(0);

	// Lock body scroll when lightbox is open
	useEffect(() => {
		if (!selected) return;
		const original = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = original;
		};
	}, [selected]);

	// Track scroll position for indicators
	const handleScroll = () => {
		if (!scrollRef.current) return;
		const { scrollLeft, offsetWidth } = scrollRef.current;
		const index = Math.round(scrollLeft / (offsetWidth * 0.85));
		setActiveIndex(index);
	};

	const scrollToIndex = (index: number) => {
		if (!scrollRef.current) return;
		const itemWidth = scrollRef.current.offsetWidth * 0.85;
		scrollRef.current.scrollTo({ left: index * itemWidth, behavior: "smooth" });
	};

	return (
		<section id="experiencias" className="bg-clay-50 relative overflow-hidden">
			<div
				className="absolute top-0 right-0 w-[600px] h-[600px] bg-inka-gold/[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
				aria-hidden="true"
			/>

			<div className="max-w-7xl mx-auto px-6 md:px-12">
				<motion.div
					className="mb-10 md:mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
				>
					<div className="flex items-center gap-4 mb-5">
						<motion.div
							className="h-[1px] bg-inka-gold/40"
							initial={{ width: 0 }}
							whileInView={{ width: 60 }}
							viewport={{ once: true }}
							transition={{
								duration: 1,
								delay: 0.3,
								ease: [0.32, 0.72, 0, 1],
							}}
						/>
						<p className="text-inka-gold text-[10px] uppercase tracking-[0.4em] font-bold">
							Experiencias
						</p>
					</div>
					<h2 className="text-clay-950 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-tighter max-w-4xl">
						Caminos que <span className="text-inka-gold">transforman</span> el
						espíritu
					</h2>
				</motion.div>

				{/* Bento grid with horizontal scroll on mobile */}
				<div
					ref={scrollRef}
					onScroll={handleScroll}
					className="flex md:grid md:grid-cols-4 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-proximity [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0"
					style={{ overscrollBehaviorX: "contain" }}
				>
					{cards.map((card, i) => (
						<FeatureCard
							key={card.id}
							card={card}
							index={i}
							onOpen={setSelected}
						/>
					))}
				</div>

				{/* Mobile Navigation Controls */}
				<div className="flex md:hidden items-center justify-between mt-8">
					<div className="flex gap-2">
						{cards.map((_, i) => (
							<button
								key={i}
								onClick={() => scrollToIndex(i)}
								className={cn(
									"h-1 transition-all duration-500 rounded-full",
									i === activeIndex ? "w-8 bg-inka-gold" : "w-3 bg-clay-200",
								)}
								aria-label={`Ir a tarjeta ${i + 1}`}
							/>
						))}
					</div>
					<div className="flex gap-3">
						<button
							onClick={() => scrollToIndex(activeIndex - 1)}
							disabled={activeIndex === 0}
							className="w-12 h-12 rounded-full border border-clay-200 flex items-center justify-center text-clay-900 disabled:opacity-30 disabled:cursor-not-allowed"
						>
							<IconChevronLeft size={20} />
						</button>
						<button
							onClick={() => scrollToIndex(activeIndex + 1)}
							disabled={activeIndex === cards.length - 1}
							className="w-12 h-12 rounded-full border border-clay-200 flex items-center justify-center text-clay-900 disabled:opacity-30 disabled:cursor-not-allowed"
						>
							<IconChevronRight size={20} />
						</button>
					</div>
				</div>
			</div>

			{/* Lightbox / Modal */}
			<AnimatePresence>
				{selected && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-clay-950/95 backdrop-blur-xl"
						onClick={() => setSelected(null)}
					>
						<motion.div
							initial={{ scale: 0.9, y: 20 }}
							animate={{ scale: 1, y: 0 }}
							exit={{ scale: 0.9, y: 20 }}
							className="relative max-w-5xl w-full aspect-[4/5] md:aspect-video rounded-[3rem] overflow-hidden bg-clay-900 shadow-2xl"
							onClick={(e) => e.stopPropagation()}
						>
							<img
								src={selected.image?.src}
								alt={selected.title}
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-clay-950 via-transparent to-transparent opacity-80" />

							<div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
								<h2 className="text-white font-display font-bold text-3xl md:text-5xl mb-6 tracking-tighter">
									{selected.title}
								</h2>
								<p className="text-white/70 text-sm md:text-lg max-w-3xl leading-relaxed">
									{selected.description}
								</p>
							</div>

							<button
								className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
								onClick={() => setSelected(null)}
							>
								<IconX size={24} />
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
