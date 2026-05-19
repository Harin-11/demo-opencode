import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";
import type { Content } from "@/data/types";

interface FooterProps {
	content: Content["footer"];
}

export function Footer({ content: footer }: FooterProps) {
	const ref = useRef<HTMLElement>(null!);
	const isInView = useInView(ref, { once: true, margin: "-50px" });

	return (
		<motion.footer
			ref={ref}
			className="bg-clay-950 text-clay-400 relative"
			initial={{ opacity: 0, y: 20 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
		>
			{/* Subtle gradient at top */}
			<div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-inka-gold/5 to-transparent pointer-events-none" />

			{/* Hairline separator */}
			<div className="h-px bg-gradient-to-r from-transparent via-clay-700/30 to-transparent mx-6 md:mx-12" />

			<div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-18">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
					{/* Brand */}
					<div>
						<h3 className="text-clay-100 font-display font-bold text-lg mb-2">
							{footer.brandName}
						</h3>
						<p className="text-clay-500 text-sm">{footer.tagline}</p>
					</div>

					{/* Navigation */}
					<div>
						<p className="text-clay-200 text-sm font-medium uppercase tracking-wider mb-4">
							Navegación
						</p>
						<ul className="space-y-2">
							{footer.navLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-clay-400 hover:text-clay-100 transition-colors duration-300 text-sm"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Contact & Social */}
					<div>
						<p className="text-clay-200 text-sm font-medium uppercase tracking-wider mb-4">
							Contacto
						</p>
						{footer.contact.email && (
							<p className="text-sm mb-1">
								<a
									href={`mailto:${footer.contact.email}`}
									className="text-clay-400 hover:text-clay-100 transition-colors duration-300"
								>
									{footer.contact.email}
								</a>
							</p>
						)}
						{footer.contact.phone && (
							<p className="text-sm mb-4">{footer.contact.phone}</p>
						)}

						<div className="flex gap-4 mt-4">
							{footer.socialLinks.map((link) => (
								<a
									key={link.platform}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="w-9 h-9 rounded-full bg-clay-800/50 flex items-center justify-center hover:bg-inka-gold/20 hover:text-inka-gold hover:scale-110 transition-all duration-300"
									aria-label={link.platform}
								>
									{link.platform === "Instagram" && (
										<IconBrandInstagram className="w-4 h-4" />
									)}
									{link.platform === "WhatsApp" && (
										<IconBrandWhatsapp className="w-4 h-4" />
									)}
								</a>
							))}
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="border-t border-clay-800/30 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-clay-600 text-xs">{footer.copyright}</p>
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
						className="text-clay-600 hover:text-inka-gold text-xs flex items-center gap-1 transition-colors duration-300"
					>
						Volver arriba
						<svg
							className="w-3 h-3"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M18 15l-6-6-6 6" />
						</svg>
					</a>
				</div>
			</div>
		</motion.footer>
	);
}
