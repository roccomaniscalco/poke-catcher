import { Client } from "discord.js";
import dotenv from "dotenv";
import { getPokemonName } from "./pokeSearcher.js";

dotenv.config();

// create a Client instance (bot) to interact with the Discord server
const bot = new Client();

bot.on("ready", async () => {
  console.log("\x1b[32m", "• PokéCatcher Active •", "\x1b[0m");
});

bot.on("message", async (message) => {
  // if a message embed title includes "pokémon has appeared!"
  if (message.embeds[0]?.title.includes("pokémon has appeared!")) {
    const pokemonImageUrl = message.embeds[0].image.url;
    const pokemonName = await getPokemonName(pokemonImageUrl);
    console.log("\x1b[0m", `  ~ Pokémon Detected: ${pokemonName}`, "\x1b[0m");
  }
  // if a message content is "ping"
  else if (message.content === "ping") {
    message.channel.send("pong");
  }
});

// establish connection to the Discord server via bot key
bot.login(process.env.BOT_KEY);
