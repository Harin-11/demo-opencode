import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? "github" : "list",
	use: {
		baseURL: "http://localhost:4321",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},
	webServer: {
		command: "pnpm dev",
		port: 4321,
		reuseExistingServer: !process.env.CI,
		stdout: "pipe",
		stderr: "pipe",
	},
});
