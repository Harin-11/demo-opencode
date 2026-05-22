import { test, expect } from "@playwright/test";

test.describe("Rutas del Sol — Landing Page Smoke Tests", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/", { waitUntil: "networkidle" });
	});

	test("page loads with correct title", async ({ page }) => {
		await expect(page).toHaveTitle(/Rutas del Sol/);
	});

	test("hero section is visible with heading", async ({ page }) => {
		const hero = page.locator("#hero");
		await expect(hero).toBeVisible();
		await expect(hero.locator("h1")).toBeVisible();
	});

	test("navigation links are present on desktop", async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 800 });

		const nav = page.getByRole("navigation");
		await expect(nav).toBeVisible();

		await expect(page.getByText("Experiencias")).toBeVisible();
		await expect(page.getByText("Itinerarios")).toBeVisible();
		await expect(page.getByText("Galería")).toBeVisible();
		await expect(page.getByText("Contacto")).toBeVisible();
	});

	test("features section renders with cards", async ({ page }) => {
		const experiences = page.locator("#experiencias");
		await experiences.scrollIntoViewIfNeeded();
		await expect(experiences).toBeVisible();

		// At least one feature card heading is visible
		const heading = experiences.locator("h3").first();
		await expect(heading).toBeVisible();
	});

	test("gallery and testimonials section exists", async ({ page }) => {
		const gallery = page.locator("#galeria");
		await gallery.scrollIntoViewIfNeeded();
		await expect(gallery).toBeVisible();
	});

	test("cta section has primary button", async ({ page }) => {
		const cta = page.locator("#contacto");
		await cta.scrollIntoViewIfNeeded();
		await expect(cta).toBeVisible();

		// Check for CTA heading and primary link
		await expect(cta.locator("a[href^='mailto']").first()).toBeVisible();
	});

	test("footer has brand name and social links", async ({ page }) => {
		const footer = page.locator("footer");
		await footer.scrollIntoViewIfNeeded();
		await expect(footer).toBeVisible();

		await expect(footer.getByText("Rutas del Sol")).toBeVisible();
		await expect(
			footer.getByText("Caminos que cuentan historias"),
		).toBeVisible();
	});

	test("meta description exists in Spanish", async ({ page }) => {
		const metaDesc = page.locator('meta[name="description"]');
		await expect(metaDesc).toHaveAttribute("content", /Arequipa/);
	});

	test("JSON-LD structured data is present", async ({ page }) => {
		const jsonld = page.locator('script[type="application/ld+json"]');
		await expect(jsonld).toBeAttached();
		const content = await jsonld.textContent();
		expect(content).toContain("TravelAgency");
		expect(content).toContain("Rutas del Sol");
	});
});
