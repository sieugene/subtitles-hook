import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: null,
});
const syedgakbarPage = await browser.newPage();
await syedgakbarPage.goto("https://www.syedgakbar.com/projects/dst");

const turboscribePage = await browser.newPage();
await turboscribePage.goto("https://turboscribe.ai/dashboard");

// const additionalToolPage = await browser.newPage();
// await additionalToolPage.goto("https://...com");
