import { motion } from "framer-motion";

const partners = [
	"National Geographic",
	"Travel + Leisure",
	"Lonely Planet",
	"Condé Nast Traveler",
	"The New York Times",
	"BBC Travel",
	"Rough Guides",
	"Adventure Travel News",
];

export function TrustBar() {
	const duplicated = [...partners, ...partners];

	return (
		<section className="py-12 md:py-16 bg-clay-100 overflow-hidden relative">
			<div className="max-w-7xl mx-auto px-6 md:px-12 mb-6">
				<p className="text-clay-600 text-xs uppercase tracking-[0.3em] font-medium text-center">
					Mencionados en
				</p>
			</div>

			<div className="relative w-full overflow-hidden">
				{/* Edge fades */}
				<div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-clay-100 to-transparent z-10 pointer-events-none" />
				<div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-clay-100 to-transparent z-10 pointer-events-none" />
				<motion.div
					className="flex gap-16 w-max"
					animate={{ x: ["0%", "-50%"] }}
					transition={{
						x: { duration: 30, repeat: Infinity, ease: "linear" },
					}}
					style={{ willChange: "transform" }}
				>
					{duplicated.map((name, i) => (
						<span
							key={`${name}-${i}`}
							className="text-clay-400 text-lg md:text-xl font-display font-bold tracking-tight whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity duration-500 select-none"
						>
							{name}
						</span>
					))}
				</motion.div>
			</div>
		</section>
	);
}
