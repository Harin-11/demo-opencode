import { motion } from "framer-motion";

interface TrustBarProps {
	partners?: string[];
}

const defaultPartners = [
	"National Geographic",
	"Travel + Leisure",
	"Lonely Planet",
	"Condé Nast Traveler",
	"The New York Times",
	"BBC Travel",
	"Rough Guides",
	"Adventure Travel News",
];

export function TrustBar({ partners = defaultPartners }: TrustBarProps) {
	const duplicated = [...partners, ...partners];

	return (
		<section className="py-16 md:py-24 bg-clay-100 overflow-hidden relative">
			<div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
				<p className="text-clay-500 text-[10px] uppercase tracking-[0.5em] font-bold text-center opacity-60">
					Mencionados en
				</p>
			</div>

			<div className="relative w-full overflow-hidden">
				{/* Edge fades for smooth entry/exit */}
				<div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-clay-100 to-transparent z-10 pointer-events-none" />
				<div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-clay-100 to-transparent z-10 pointer-events-none" />
				
				<motion.div
					className="flex gap-20 md:gap-32 w-max items-center"
					animate={{ x: ["0%", "-50%"] }}
					transition={{
						x: { duration: 40, repeat: Infinity, ease: "linear" },
					}}
					style={{ willChange: "transform" }}
				>
					{duplicated.map((name, i) => (
						<span
							key={`${name}-${i}`}
							className="text-clay-950 text-2xl md:text-4xl font-display font-bold tracking-tighter whitespace-nowrap opacity-20 hover:opacity-100 transition-opacity duration-700 select-none grayscale hover:grayscale-0 cursor-default"
						>
							{name}
						</span>
					))}
				</motion.div>
			</div>
		</section>
	);
}
