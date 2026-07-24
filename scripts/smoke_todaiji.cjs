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

    if (await page.locator(".lotus-evidence img").count() !== 1) errors.push("lotus-petal evidence image is missing");
    if (await page.locator("#hall-scale").count()) errors.push("obsolete hall-width slider remains");
    await page.locator("[data-hall-view-select='ancient']").click();
    if (await page.locator("[data-hall-view]").getAttribute("data-hall-view") !== "ancient") errors.push("hall comparison did not switch to ancient state");

    await page.locator("[data-route-select='full']").click();
    if (!await page.locator("[data-route-panel='full']").isVisible()) errors.push("full route does not open");

    if (await page.locator("[data-material-filter]").count()) errors.push("obsolete material filter remains");
    const materialExamples = await page.locator("#materials [data-material-card] .technique-example a[href^='https://']").count();
    if (materialExamples !== 5) errors.push(`material cards contain ${materialExamples} linked examples instead of 5`);

    await page.locator("[data-reconstruction='hypothesis']").click();
    const hypotheses = await page.locator("[data-hypothesis]:visible").count();
    if (hypotheses !== 3) errors.push(`reconstruction shows ${hypotheses} hypothesis cards`);

    await page.locator("[data-reading-mode-toggle]").click();
    if (await page.locator("body").getAttribute("data-reading-mode") !== "field") errors.push("on-site quick read did not activate");
    if (await page.locator("#historical-spine").isVisible()) errors.push("long study section remains visible in on-site mode");
    if (!await page.locator("#field-checklist").isVisible()) errors.push("on-site quick-read handoff is hidden");
    if (await page.locator("#field-checklist input[type='checkbox']").count()) errors.push("inert checklist boxes remain");
    const quickReadHref = await page.locator("#field-checklist .todaiji-quick-read-link a").getAttribute("href");
    if (quickReadHref !== "museums.html#todaiji-quick-read") errors.push("on-site quick read does not link to the museum page");

    await page.locator("[data-reading-mode-toggle]").click();
    const allImages = await page.locator("main img").count();
    const linkedImages = await page.locator("main a.image-original-link > img, main a.four-king-image > img, main .sound-card-image > a > img").count();
    if (allImages === 0) errors.push("Tōdai-ji page contains no content images");
    if (linkedImages !== allImages) errors.push(`${allImages - linkedImages} content images are not linked to their complete image`);
    const firstImageLink = page.locator("main a.image-original-link, main a.four-king-image, main .sound-card-image > a").first();
    if (await firstImageLink.getAttribute("target") !== "_blank") errors.push("image link does not open separately");
    if (!await firstImageLink.getAttribute("href")) errors.push("image link has no original-image URL");

    const kingCards = page.locator("#kaidando-four-kings [data-four-king]");
    if (await kingCards.count() !== 4) errors.push("Kaidan-dō gallery does not contain four guardian cards");
    for (const king of ["持國天", "增長天", "廣目天", "多聞天"]) {
      const card = page.locator(`#kaidando-four-kings [data-four-king="${king}"]`);
      if (await card.count() !== 1) errors.push(`missing Kaidan-dō image card for ${king}`);
      const href = await card.locator("a.four-king-image").getAttribute("href");
      if (!href || !href.includes("commons.wikimedia.org/wiki/Special:Redirect/file/")) errors.push(`${king} does not link to a full Commons image`);
    }
    if (await page.locator("#kaidando > .material-note").count()) errors.push("standalone Kaidan-dō material note still consumes a layout column");
    if (await page.locator("#kaidando-four-kings").evaluate((element) => element.parentElement?.id) !== "kaidando") {
      errors.push("Kaidan-dō gallery is not a direct full-width child of the station card");
    }
    const galleryBox = await page.locator("#kaidando-four-kings").boundingBox();
    const copyBox = await page.locator("#kaidando > .stop-copy").boundingBox();
    if (!galleryBox || !copyBox || galleryBox.width < copyBox.width * 0.95) errors.push("Kaidan-dō gallery remains narrower than the main text");
    const galleryText = await page.locator("#kaidando-four-kings").innerText();
    for (const phrase of ["塑造（そぞう）", "木骨作芯", "粗泥", "細泥", "怕震"]) {
      if (!galleryText.includes(phrase)) errors.push(`Kaidan-dō integrated material explanation is missing: ${phrase}`);
    }

    const soundCards = page.locator("#sound [data-sound-card]");
    if (await soundCards.count() !== 4) errors.push("Sound, Ritual, Scale does not contain four enhanced media cards");
    for (const key of ["shomyo", "nara-taro", "omigui", "shunie-recording"]) {
      const card = page.locator(`#sound [data-sound-card="${key}"]`);
      if (await card.count() !== 1) errors.push(`missing Sound, Ritual, Scale card: ${key}`);
      if (await card.locator("figure img").count() !== 1) errors.push(`${key} does not contain an image`);
    }
    const expectedPlayers = {
      "nara-taro": "QmBk12w649s",
      "omigui": "eUj8tb6q1z0",
      "shunie-recording": "n7FU3r4Nlek",
    };
    for (const [key, videoId] of Object.entries(expectedPlayers)) {
      const src = await page.locator(`#sound [data-sound-card="${key}"] iframe`).getAttribute("src");
      if (!src || !src.includes(`youtube-nocookie.com/embed/${videoId}`)) errors.push(`${key} does not embed the requested YouTube video`);
    }
    const shomyoHref = await page.locator('#sound [data-sound-card="shomyo"] .external-player-panel a').getAttribute("href");
    if (!shomyoHref || !shomyoHref.includes("www2.ntj.jac.go.jp/dglib/contents/learn/edc28/miru/temple/s_11.html")) errors.push("Kegon shōmyō card does not retain the original player link");
    const recordingTitle = await page.locator('#sound [data-sound-card="shunie-recording"] h3').innerText();
    if (recordingTitle !== "修二會現地錄音") errors.push("Shuni-e recording card title was not simplified");
    const playlistSrc = await page.locator('#sound [data-sound-card="shunie-recording"] iframe').getAttribute("src");
    if (!playlistSrc || !playlistSrc.includes("list=PLRbGqqBTO3HaZoQ2Keur6W5LOjqaS_Vyn")) errors.push("Shuni-e recording player does not retain the requested playlist");

    const expectedObjectLinks = [
      "online.bunka.go.jp/db/heritages/detail/192443",
      "online.bunka.go.jp/db/heritages/detail/152018",
      "online.bunka.go.jp/heritages/detail/266902/2",
      "online.bunka.go.jp/db/heritages/detail/181542",
    ];
    for (const expected of expectedObjectLinks) {
      if (await page.locator(`#object-room a[href*="${expected}"]`).count() !== 1) {
        errors.push(`museum dossier does not link to ${expected}`);
      }
    }

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
  console.log("TŌDAI-JI SMOKE TEST PASSED: responsive layouts, evidence image, hall toggle, routes, linked material examples, reconstruction, on-site quick-read handoff, original-image links, Kaidan-dō gallery and Sound Ritual Scale media cards");
})();
