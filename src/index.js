import { Client } from "discord.js";
import dotenv from "dotenv";

import trainer from "./userBot.js";
import { getPokemonName } from "./imageSearch.js";

// parse environment variables
dotenv.config();

// create a Client instance (bot) to interact with the Discord server
const pokeCatcher = new Client();

pokeCatcher.on("ready", async () => {
  console.log("\x1b[32m", "PokéCatcher Active", "\x1b[0m");
});

pokeCatcher.on("message", async (message) => {
  // is a Pokétwo message
  if (message.author.username === "Pokétwo") {
    // is a wild pokémon
    if (message.embeds[0]?.title.includes("pokémon has appeared!")) {
      trainer.stopSearch();
      const pokemonImageUrl = message.embeds[0].image.url;
      const pokemonName = await getPokemonName(pokemonImageUrl);
      console.log("\x1b[2m", `• pokémon determined: ${pokemonName}`, "\x1b[0m");
      trainer.catchPokemon(pokemonName);
      trainer.startSearch();
    }
  } else if (message.content === "c!start") {
    trainer.startSearch();
  } else if (message.content === "ping") {
    message.channel.send("pong");
  }
});

// establish connection to the Discord server via bot key
pokeCatcher.login(process.env.BOT_KEY);
