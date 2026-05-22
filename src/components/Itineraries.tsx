import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconClock, IconCircleCheck } from "@tabler/icons-react";
import type { Content, Itinerary } from "@/data/types";

interface ItinerariesProps {
	content: Content["itineraries"];
}

function ItineraryCard({ 
	item, 
	isExpanded, 
	onToggle 
}: { 
	item: Itinerary; 
	isExpanded: boolean; 
	onToggle: () => void; 
}) {
	return (
		<motion.div
			layout
			onClick={onToggle}
			className={cn(
				"relative h-[500px] md:h-[600px] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] overflow-hidden group",
				isExpanded ? "w-full md:flex-[3]" : "w-full md:flex-[0.8]"
			)}
		>
			<motion.img
				layout="position"
				src={item.image}
				alt={item.title}
				className="absolute inset-0 w-full h-full object-cover"
			/>
			<div className={cn(
				"absolute inset-0 bg-gradient-to-t from-clay-950 via-clay-950/20 to-transparent transition-opacity duration-700",
				isExpanded ? "opacity-90" : "opacity-60 group-hover:opacity-70"
			)} />

			<div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
				<motion.div layout="position" className="relative z-10">
					<div className="flex items-center gap-3 mb-4">
						<div className="px-3 py-1 rounded-full bg-inka-gold text-clay-950 font-bold text-[10px] uppercase tracking-widest">
							{item.duration}
						</div>
					</div>
					<h3 className={cn(
						"text-white font-display font-bold leading-none tracking-tighter mb-4 transition-all duration-700",
						isExpanded ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"
					)}>
						{item.title}
					</h3>
				</motion.div>

				<AnimatePresence mode="wait">
					{isExpanded && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="relative z-10 max-w-2xl"
						>
							<p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
								{item.description}
							</p>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{item.highlights.map((h, i) => (
									<div key={i} className="flex items-center gap-3 text-white/90">
										<IconCircleCheck size={18} className="text-inka-gold shrink-0" />
										<span className="text-sm font-medium">{h}</span>
									</div>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Vertical Title for collapsed state on desktop */}
			{!isExpanded && (
				<div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
					<p className="text-white/20 font-display font-bold text-6xl uppercase tracking-[0.2em] rotate-90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-700">
						Ver Ruta
					</p>
				</div>
			)}
		</motion.div>
	);
}

export function Itineraries({ content: { title, subtitle, items } }: ItinerariesProps) {
	const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);
	const ref = useRef<HTMLElement>(null!);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section ref={ref} id="itinerarios" className="bg-clay-100 overflow-hidden">
			<div className="max-w-7xl mx-auto px-6 md:px-12">
				<motion.div
					className="mb-16 md:mb-24 text-center md:text-left"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
				>
					<div className="flex items-center justify-center md:justify-start gap-4 mb-6">
						<span className="w-10 h-[1px] bg-inka-gold/40" />
						<p className="text-inka-gold text-[10px] uppercase tracking-[0.4em] font-bold">
							Rutas sugeridas
						</p>
					</div>
					<h2 className="text-clay-950 font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[1] tracking-tighter mb-6">
						{title}
					</h2>
					<p className="text-clay-600 text-lg md:text-xl max-w-2xl mx-auto md:mx-0 font-light">
						{subtitle}
					</p>
				</motion.div>

				<div className="flex flex-col md:flex-row gap-4 md:gap-2">
					{items.map((item) => (
						<ItineraryCard
							key={item.id}
							item={item}
							isExpanded={expandedId === item.id}
							onToggle={() => setExpandedId(item.id === expandedId ? null : item.id)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
