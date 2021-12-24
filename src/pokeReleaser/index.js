import { Client } from "discord.js";
import dotenv from "dotenv";
import handler from "./handler.js";

// parse environment variables
dotenv.config();

// create a Client instance (bot) to interact with the Discord server
const pokeCatcher = new Client();

pokeCatcher.on("ready", async () => {
  handler.onReady();
});

pokeCatcher.on("message", async (message) => {
  // is a Pokétwo message
  if (message.author.username === "Pokétwo") {
    if (message.embeds[0]?.title === "Your pokémon")
      return handler.onViewingPokemon(message.embeds[0]);
    if (message.content === "No pokémon found.")
      return handler.onStoppedViewingPokemon();
    if (message.content.includes("Are you sure you want to release"))
      return handler.onConfirmRelease();
    if (message.content.includes("You released")) 
      return handler.onRelease();
  }

  // is a user message
  else if (message.author.id === process.env.USER_ID) {
    if (message.content == "clean") handler.onClean();
  }
});

// establish connection to the Discord server via bot key
pokeCatcher.login(process.env.BOT_KEY);
