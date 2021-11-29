import puppeteer from "puppeteer";

import saveImgUrlToPath from "./util/saveImgUrlToPath.js";
import delay from "./util/delay.js";
import { pokedex } from "./util/pokedex.js";

const searchImage = async (page, path) => {
  // navigate to system file chooser
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    await page.$eval("button", (el) => el.click()),
    await page.$eval("li", (el) => el.click()),
  ]);

  // input image from path
  await fileChooser.accept([path]);
};

const scrapeSearchResults = async (page) => {
  // scrape exact match
  try {
    return await page.$eval(".Cy3un", (el) => el.innerText);
  } catch (e) {
    console.log("\x1b[2m", "• exact match not found", "\x1b[0m");
  }

  // scrape similar images
  try {
    // get all similar image captions
    const captions = await page.$$eval(".UAiK1e", (els) =>
      els.map((el) => el.innerText)
    );

    // find the first caption to match a pokedex entry
    // return the pokedex entry
    for (const caption of captions) {
      const pokemonName = pokedex.find((pokemon) =>
        caption.toLowerCase().includes(pokemon)
      );
      if (pokemonName) return pokemonName;
    }
  } catch (e) {
    console.log("\x1b[2m", "• similar images not found", "\x1b[0m");
  }
};

const getPokemonName = async (imageUrl) => {
  // launch browser and open image search
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://lens.google.com/search?p");

  // search for image
  await saveImgUrlToPath(imageUrl, "./pokemon.jpg");
  await searchImage(page, "./pokemon.jpg");

  // wait for search results
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  await delay(5000);

  // scrape pokémon name from search results
  const pokemonName = await scrapeSearchResults(page);
  browser.close;

  if (pokemonName) {
    console.log("\x1b[2m", `• pokémon determined: ${pokemonName}`, "\x1b[0m");
    return pokemonName;
  } else throw Error("Failed to scrape pokémon name");
};

export default getPokemonName;
