import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import type { Content } from "@/data/types";

interface NavProps {
	content: Content["nav"];
}

export function Nav({ content: { brandName, links } }: NavProps) {
	const [activeSection, setActiveSection] = useState("");
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// Scroll-based background change
	const { scrollY } = useScroll();
	useMotionValueEvent(scrollY, "change", (latest) => {
		setScrolled(latest > 80);
	});

	// Active section tracking on scroll
	useEffect(() => {
		const handleScroll = () => {
			const sections = links.map((l) =>
				document.querySelector(l.href.replace("#", "#")),
			);
			const scrollPos = window.scrollY + 120;

			for (let i = sections.length - 1; i >= 0; i--) {
				const el = sections[i] as HTMLElement | null;
				if (el && el.offsetTop <= scrollPos) {
					setActiveSection(el.id || "");
					return;
				}
			}
			setActiveSection("");
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [links]);

	const handleNavClick = useCallback((href: string) => {
		setMobileOpen(false);
		const id = href.replace("#", "");
		if (id === "") {
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
	}, []);

	return (
		<>
			{/* Desktop floating pill */}
			<motion.div
				initial={{ y: -80, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
				className={cn(
					"fixed top-4 left-1/2 -translate-x-1/2 z-50 w-max rounded-full border border-white/10 px-6 py-3 hidden md:flex items-center gap-8 transition-all duration-500",
					scrolled
						? "bg-clay-950/95 backdrop-blur-2xl shadow-lg shadow-black/20"
						: "bg-clay-950/70 backdrop-blur-xl",
				)}
			>
				<a
					href="#"
					onClick={(e) => {
						e.preventDefault();
						handleNavClick("#");
					}}
					className="text-clay-100 font-display font-bold text-sm tracking-tight whitespace-nowrap hover:text-inka-gold transition-colors"
				>
					{brandName}
				</a>
				<NavigationMenu>
					<NavigationMenuList className="flex items-center gap-6">
						{links.map((link) => {
							const isActive = activeSection === link.href.slice(1);
							return (
								<NavigationMenuItem key={link.label}>
									<a
										href={link.href}
										onClick={(e) => {
											e.preventDefault();
											handleNavClick(link.href);
										}}
										className={cn(
											"nav-link relative text-sm font-medium transition-colors duration-300 hover:text-clay-100 py-1",
											isActive ? "text-inka-gold" : "text-clay-400",
										)}
									>
										{link.label}
										{isActive && (
											<motion.span
												layoutId="activeNavIndicator"
												className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-inka-gold rounded-full"
												transition={{
													type: "spring",
													stiffness: 380,
													damping: 30,
												}}
											/>
										)}
									</a>
								</NavigationMenuItem>
							);
						})}
					</NavigationMenuList>
				</NavigationMenu>
			</motion.div>

			{/* Mobile hamburger + Sheet */}
			<div className="fixed top-4 right-4 z-50 md:hidden">
				<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
					<SheetTrigger className="w-11 h-11 rounded-full bg-clay-950/80 backdrop-blur-2xl border border-white/10 text-clay-100 hover:bg-clay-950/90 inline-flex items-center justify-center cursor-pointer" aria-label="Abrir menú">
						<IconMenu2 className="h-5 w-5" />
					</SheetTrigger>
					<SheetContent
						side="top"
						className="h-full bg-clay-950/95 backdrop-blur-3xl border-b border-white/10 flex flex-col items-center justify-center gap-8"
					>
						<SheetHeader className="sr-only">
							<SheetTitle>Menú de navegación</SheetTitle>
						</SheetHeader>
						<div className="absolute top-4 right-4">
							<Button
								variant="ghost"
								size="icon"
								className="w-11 h-11 rounded-full bg-clay-950/80 backdrop-blur-2xl border border-white/10 text-clay-100 hover:bg-clay-950/90"
								onClick={() => setMobileOpen(false)}
								aria-label="Cerrar menú"
							>
								<IconX className="h-5 w-5" />
							</Button>
						</div>
						<a
							href="#"
							className="text-clay-100 font-display font-bold text-2xl mb-4"
							onClick={() => setMobileOpen(false)}
						>
							{brandName}
						</a>
						{links.map((link) => (
							<a
								key={link.label}
								href={link.href}
								onClick={(e) => {
									e.preventDefault();
									handleNavClick(link.href);
								}}
								className={cn(
									"nav-link text-2xl font-medium transition-colors duration-300",
									activeSection === link.href.slice(1)
										? "text-inka-gold"
										: "text-clay-300 hover:text-clay-100",
								)}
							>
								{link.label}
							</a>
						))}
					</SheetContent>
				</Sheet>
			</div>
		</>
	);
}
