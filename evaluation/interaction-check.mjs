// Automated keyboard, focus and layout checks for the Relay Ops prototype.
// 1. In ops-console-prototype: npm run dev
// 2. Here: npm i -D playwright && npx playwright install chromium && node evaluation/interaction-check.mjs
import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:3000/";
const results = [];
const check = (name, pass, detail = "") => results.push({ name, pass, detail });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(URL);
await page.waitForTimeout(900);

// Open a row with the keyboard only
await page.locator("tbody tr").first().focus();
await page.keyboard.press("Enter");
check("Enter on a row opens the detail panel", (await page.locator('[role="dialog"]').count()) === 1);
check("Focus moves into the panel", await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]')));

// Submitting the resolve form empty shows a helpful error
await page.getByRole("button", { name: "Resolve" }).click();
await page.getByRole("button", { name: "Mark resolved" }).click();
const err = await page.locator(".rds-field__error").allInnerTexts();
check("Empty resolve shows a next-step error", err.some((t) => t.includes("Choose why")), err.join(" | ").replace(/^!\s*/, ""));

// Escape closes and returns focus to the row
await page.keyboard.press("Escape");
check("Escape closes the panel", (await page.locator('[role="dialog"]').count()) === 0);
check("Focus returns to the row", (await page.evaluate(() => document.activeElement?.tagName)) === "TR");

// Tabs respond to arrow keys
await page.getByRole("tab", { selected: true }).focus();
await page.keyboard.press("ArrowRight");
check("ArrowRight moves to the next tab", (await page.getByRole("tab", { selected: true }).innerText()).startsWith("Resolved"));

// No horizontal page scroll on a phone
const phone = await browser.newPage({ viewport: { width: 390, height: 844 } });
await phone.goto(URL);
await phone.waitForTimeout(900);
check("No horizontal scroll at 390px", !(await phone.evaluate(() => document.documentElement.scrollWidth > innerWidth)));

check("No runtime errors", errors.length === 0, errors.join(" | "));
await browser.close();

for (const r of results) console.log(`${r.pass ? "pass" : "FAIL"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
process.exit(results.every((r) => r.pass) ? 0 : 1);
