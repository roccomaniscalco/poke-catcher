import puppeteer from "puppeteer";
import saveImgUrlToPath from "./saveImgUrlToPath.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPokemonName(imageUrl) {
  // save image pokemon image url to path
  await saveImgUrlToPath(imageUrl, "./pokemon.jpg");

  // launch browser and open lens search tab
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://lens.google.com/search?p");

  // navigate to file chooser
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    await page.$eval("button", (el) => el.click()),
    await page.$eval("li", (el) => el.click()),
  ]);

  // input file to file chooser
  await fileChooser.accept(["./pokemon.jpg"]);

  // wait for dom content to fully load
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  await delay(5000);

  // scrape pokemon name and close browser
  const pokemonName = await page.$eval(".Cy3un", (el) => el.innerText);
  browser.close;

  return pokemonName;
}
