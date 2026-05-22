import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageEntrance() {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setShow(false), 2200);
		return () => clearTimeout(timer);
	}, []);

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className="fixed inset-0 z-[100] flex items-center justify-center bg-clay-950 pointer-events-none"
					initial={{ opacity: 1 }}
					exit={{
						opacity: 0,
						transition: { duration: 0.7, delay: 0.3, ease: [0.32, 0.72, 0, 1] },
					}}
				>
					{/* Decorative dot pattern background */}
					<div
						className="absolute inset-0 opacity-30"
						style={{
							backgroundImage:
								"radial-gradient(circle, var(--color-inka-gold) 1px, transparent 1px)",
							backgroundSize: "16px 16px",
						}}
					/>

					{/* Geometric accent shapes */}
					<motion.div
						className="absolute top-1/4 left-[15%] w-32 h-32 opacity-20"
						animate={{ rotate: 360, scale: [1, 1.1, 1] }}
						transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
					>
						<svg viewBox="0 0 100 100" fill="none">
							<path
								d="M50 10 L90 50 L50 90 L10 50 Z"
								stroke="var(--color-inka-gold)"
								strokeWidth="0.5"
							/>
							<path
								d="M50 30 L70 50 L50 70 L30 50 Z"
								fill="var(--color-inka-gold)"
								opacity="0.15"
							/>
						</svg>
					</motion.div>

					<motion.div
						className="absolute bottom-1/4 right-[12%] w-24 h-24 opacity-15"
						animate={{ rotate: -180, scale: [1, 1.15, 1] }}
						transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
					>
						<svg viewBox="0 0 100 100" fill="none">
							<path
								d="M20 50 L50 20 L80 50 L50 80 Z"
								stroke="var(--color-inka-purple)"
								strokeWidth="0.5"
							/>
						</svg>
					</motion.div>

					{/* Brand text reveal */}
					<motion.div
						className="relative z-10 text-center"
						initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
						animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
						transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
					>
						<motion.p
							className="text-inka-gold/60 text-xs uppercase tracking-[0.4em] font-medium mb-6"
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								delay: 0.5,
								ease: [0.32, 0.72, 0, 1],
							}}
						>
							Turismo · Experiencias · Cultura
						</motion.p>

						<motion.h1
							className="text-clay-50 font-display font-bold text-5xl md:text-7xl tracking-tight leading-[1.05]"
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.7,
								delay: 0.7,
								ease: [0.32, 0.72, 0, 1],
							}}
						>
							Rutas del Sol
						</motion.h1>

						{/* Animated underline */}
						<motion.div
							className="h-[2px] bg-gradient-to-r from-transparent via-inka-gold to-transparent mx-auto mt-4"
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: "180px", opacity: 1 }}
							transition={{
								duration: 0.9,
								delay: 1.0,
								ease: [0.32, 0.72, 0, 1],
							}}
						/>
					</motion.div>

					{/* Exit wipe overlay */}
					<motion.div
						className="absolute inset-0 bg-gradient-to-b from-clay-950 via-clay-950 to-transparent pointer-events-none"
						initial={{ y: "0%" }}
						exit={{
							y: "100%",
							transition: {
								duration: 0.9,
								delay: 0.1,
								ease: [0.32, 0.72, 0, 1],
							},
						}}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
