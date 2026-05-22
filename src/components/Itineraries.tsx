import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconCircleCheck, IconArrowRight } from "@tabler/icons-react";
import type { Content, Itinerary } from "@/data/types";

interface ItinerariesProps {
	content: Content["itineraries"];
}

/* ── Desktop Accordion Card ──
   Contenido siempre en el DOM — nunca se desmonta.
   Solo opacity + y animan. No hay re-wrap de texto. */
function ItineraryCard({
	item,
	isExpanded,
	onToggle,
}: {
	item: Itinerary;
	isExpanded: boolean;
	onToggle: () => void;
}) {
	return (
		<motion.div
			layout
			transition={{ layout: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } }}
			onClick={onToggle}
			className={cn(
				"relative h-[380px] md:h-[460px] cursor-pointer overflow-hidden group rounded-2xl",
				isExpanded ? "md:flex-[3]" : "md:flex-[0.8]",
			)}
		>
			<img
				src={item.image}
				alt={item.title}
				className="absolute inset-0 w-full h-full object-cover"
			/>
			<div
				className={cn(
					"absolute inset-0 bg-gradient-to-t from-clay-950 via-clay-950/20 to-transparent transition-opacity duration-500",
					isExpanded ? "opacity-90" : "opacity-60 group-hover:opacity-70",
				)}
			/>

			{/* Título — siempre visible, anclado abajo */}
			<div className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-10">
				<div className="flex items-center gap-2 mb-2 md:mb-3">
					<div className="px-3 py-1 rounded-full bg-inka-gold text-clay-950 font-bold text-[10px] uppercase tracking-widest shrink-0">
						{item.duration}
					</div>
				</div>
				<h3 className="text-white font-display font-bold text-xl md:text-2xl leading-tight tracking-tighter">
					{item.title}
				</h3>
			</div>

			{/* Contenido expandido — SIEMPPE en el DOM.
			    opacity: 0 cuando colapsado → invisible pero ancho completo.
			    Así el texto nunca re-wrappea bruscamente. */}
			<motion.div
				initial={false}
				animate={
					isExpanded
						? { opacity: 1, y: 0 }
						: { opacity: 0, y: 16 }
				}
				transition={{
					duration: 0.4,
					ease: [0.32, 0.72, 0, 1],
				}}
				className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-20"
				style={{ pointerEvents: isExpanded ? "auto" : "none" }}
			>
				{/* Spacer: deja espacio al título arriba */}
				<div className="h-14 md:h-16" />

				<p className="text-white/80 text-sm md:text-base mb-4 md:mb-5 leading-relaxed">
					{item.description}
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
					{item.highlights.map((h, i) => (
						<div
							key={i}
							className="flex items-center gap-2 text-white/90"
						>
							<IconCircleCheck
								size={14}
								className="text-inka-gold shrink-0"
							/>
							<span className="text-xs font-medium">{h}</span>
						</div>
					))}
					</div>
			</motion.div>

			{/* Desktop: Horizontal blur pill on hover */}
			{!isExpanded && (
				<div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
					<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0">
						<span className="text-white font-medium text-sm tracking-wide">
							Ver ruta
						</span>
						<IconArrowRight size={16} className="text-white" />
					</div>
				</div>
			)}
		</motion.div>
	);
}

/* ── Mobile Carousel Card ── */
function MobileItineraryCard({
	item,
	isActive,
	onClick,
}: {
	item: Itinerary;
	isActive: boolean;
	onClick: () => void;
}) {
	return (
		<div
			onClick={onClick}
			className="min-w-[85vw] w-[85vw] h-[340px] relative rounded-[2rem] overflow-hidden cursor-pointer snap-start flex-shrink-0"
		>
			<img
				src={item.image}
				alt={item.title}
				className="absolute inset-0 w-full h-full object-cover"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-clay-950/90 via-clay-950/30 to-transparent" />

			<div className="absolute bottom-0 left-0 right-0 p-5">
				<div className="px-3 py-1 rounded-full bg-inka-gold text-clay-950 font-bold text-[10px] uppercase tracking-widest w-fit mb-2">
					{item.duration}
				</div>
				<h3 className="text-white font-display font-bold text-lg tracking-tighter mb-1">
					{item.title}
				</h3>
				<p
					className={cn(
						"text-white/70 text-sm leading-relaxed mb-2 transition-all duration-400",
						isActive ? "line-clamp-3" : "line-clamp-2",
					)}
				>
					{item.description}
				</p>

				{/* Highlights con fade suave */}
				<div
					className={cn(
						"space-y-1.5 mb-2 transition-all duration-350 ease-out",
						isActive
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-2 pointer-events-none",
					)}
				>
					{item.highlights.slice(0, 2).map((h, i) => (
						<div key={i} className="flex items-center gap-2 text-white/90">
							<IconCircleCheck
								size={13}
								className="text-inka-gold shrink-0"
							/>
							<span className="text-xs font-medium">{h}</span>
						</div>
					))}
				</div>

				<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 inline-flex items-center gap-2">
					<span className="text-white text-sm font-medium">
						{isActive ? "Ver menos" : "Ver ruta"}
					</span>
					<IconArrowRight size={14} className="text-white" />
				</div>
			</div>
		</div>
	);
}

/* ── Main Export ── */
export function Itineraries({
	content: { title, subtitle, items },
}: ItinerariesProps) {
	const [expandedId, setExpandedId] = useState<string | null>(
		items[0]?.id || null,
	);
	const [activeMobileId, setActiveMobileId] = useState<string | null>(null);
	const ref = useRef<HTMLElement>(null!);

	const scrollRef = useRef<HTMLDivElement>(null!);
	const [activeIndex, setActiveIndex] = useState(0);

	const handleScroll = () => {
		if (!scrollRef.current) return;
		const { scrollLeft, offsetWidth } = scrollRef.current;
		const index = Math.round(scrollLeft / (offsetWidth * 0.85));
		setActiveIndex(Math.min(index, items.length - 1));
	};

	const scrollToIndex = (index: number) => {
		if (!scrollRef.current) return;
		const itemWidth = scrollRef.current.offsetWidth * 0.85;
		scrollRef.current.scrollTo({
			left: index * itemWidth,
			behavior: "smooth",
		});
	};

	return (
		<section ref={ref} id="itinerarios" className="bg-clay-100 overflow-hidden">
			<div className="max-w-7xl mx-auto px-6 md:px-12">
				<motion.div
					className="mb-10 md:mb-16 text-center md:text-left"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.8,
						ease: [0.32, 0.72, 0, 1],
					}}
				>
					<div className="flex items-center justify-center md:justify-start gap-4 mb-5">
						<span className="w-10 h-[1px] bg-inka-gold/40" />
						<p className="text-inka-gold text-[10px] uppercase tracking-[0.4em] font-bold">
							Rutas sugeridas
						</p>
					</div>
					<h2 className="text-clay-950 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-tighter mb-4">
						{title}
					</h2>
					<p className="text-clay-600 text-base md:text-lg max-w-2xl mx-auto md:mx-0 font-light">
						{subtitle}
					</p>
				</motion.div>

				{/* Mobile: Horizontal scroll carousel */}
				<div className="md:hidden">
					<div
						ref={scrollRef}
						onScroll={handleScroll}
						className="flex gap-4 overflow-x-auto snap-x snap-proximity pb-4 -mx-6 px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
						style={{ overscrollBehaviorX: "contain" }}
					>
						{items.map((item) => (
							<MobileItineraryCard
								key={item.id}
								item={item}
								isActive={activeMobileId === item.id}
								onClick={() =>
									setActiveMobileId(
										activeMobileId === item.id ? null : item.id,
									)
								}
							/>
						))}
					</div>

					<div className="flex items-center justify-center mt-4 gap-2">
						{items.map((_, i) => (
							<button
								key={i}
								onClick={() => scrollToIndex(i)}
								className={cn(
									"h-1.5 transition-all duration-500 rounded-full",
									i === activeIndex ? "w-8 bg-inka-gold" : "w-2 bg-clay-200",
								)}
								aria-label={`Ir a itinerario ${i + 1}`}
							/>
						))}
					</div>
				</div>

				{/* Desktop: Accordion */}
				<div className="hidden md:flex flex-row gap-2">
					{items.map((item) => (
						<ItineraryCard
							key={item.id}
							item={item}
							isExpanded={expandedId === item.id}
							onToggle={() =>
								setExpandedId(
									item.id === expandedId ? null : item.id,
								)
							}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
