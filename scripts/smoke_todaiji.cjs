#!/usr/bin/env node
const { chromium } = require("playwright");

const baseUrl = process.env.SITE_URL || "http://127.0.0.1:8000";
const screenshots = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "ipad", width: 820, height: 1180 },
  { name: "mobile", width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const errors = [];
  try {
    for (const viewport of screenshots) {
      const page = await browser.newPage({ viewport });
      page.on("console", (message) => {
        if (message.type() === "error" && !message.text().includes("youtube") && !message.text().includes("wikimedia")) {
          errors.push(`${viewport.name}: console error: ${message.text()}`);
        }
      });
      await page.goto(`${baseUrl}/todaiji.html`, { waitUntil: "load" });
      await page.screenshot({ path: `/tmp/todaiji-${viewport.name}.png`, fullPage: true });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (overflow > 1) errors.push(`${viewport.name}: horizontal overflow ${overflow}px`);
      if (!await page.locator(".todaiji-hero h1").isVisible()) errors.push(`${viewport.name}: hero heading is not visible`);
      await page.close();
    }

    const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
    await page.goto(`${baseUrl}/todaiji.html`, { waitUntil: "load" });

    if (await page.locator("body").innerText().then((text) => text.includes("Plan A") || text.includes("Plan B"))) {
      errors.push("Tōdai-ji page still exposes Plan A/Plan B wording");
    }

    if (!await page.locator(".lotus-evidence img").isVisible()) errors.push("lotus-petal evidence image is not visible");
    if (await page.locator("#hall-scale").count()) errors.push("obsolete hall-width slider remains");
    await page.locator("[data-hall-view-select='ancient']").click();
    if (await page.locator("[data-hall-view]").getAttribute("data-hall-view") !== "ancient") errors.push("hall comparison did not switch to ancient state");

    await page.locator("[data-route-select='full']").click();
    if (!await page.locator("[data-route-panel='full']").isVisible()) errors.push("full route does not open");

    await page.locator("[data-material-filter='clay']").click();
    const visibleTechniques = await page.locator("[data-material-card]:visible").count();
    const visibleObjects = await page.locator("[data-object-material]:visible").count();
    if (visibleTechniques !== 1) errors.push(`clay filter shows ${visibleTechniques} technique cards`);
    if (visibleObjects !== 2) errors.push(`clay filter shows ${visibleObjects} object cards`);

    await page.locator("[data-reconstruction='hypothesis']").click();
    const hypotheses = await page.locator("[data-hypothesis]:visible").count();
    if (hypotheses !== 3) errors.push(`reconstruction shows ${hypotheses} hypothesis cards`);

    await page.locator("[data-reading-mode-toggle]").click();
    if (await page.locator("body").getAttribute("data-reading-mode") !== "field") errors.push("on-site quick read did not activate");
    if (await page.locator("#historical-spine").isVisible()) errors.push("long study section remains visible in on-site mode");
    if (!await page.locator("#field-checklist").isVisible()) errors.push("on-site stepper is hidden");
    if (await page.locator("#field-checklist input[type='checkbox']").count()) errors.push("inert checklist boxes remain");

    const firstTitle = await page.locator("[data-field-step] h3").innerText();
    await page.locator("[data-field-next]").click();
    const secondTitle = await page.locator("[data-field-step] h3").innerText();
    if (firstTitle === secondTitle) errors.push("next-stop control did not change the field step");
    if (await page.locator("[data-field-progress-label]").innerText() !== "2 / 6") errors.push("field progress did not update");

    const objectCount = await page.locator("#object-room [data-object-material]").count();
    if (objectCount !== 8) errors.push(`museum dossier contains ${objectCount} object cards`);
    await page.close();
  } finally {
    await browser.close();
  }

  if (errors.length) {
    console.error("TŌDAI-JI SMOKE TEST FAILED");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log("TŌDAI-JI SMOKE TEST PASSED: responsive layouts, evidence image, hall toggle, routes, material filter, reconstruction and on-site stepper");
})();