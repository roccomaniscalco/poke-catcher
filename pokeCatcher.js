require('dotenv').config();
const Discord = require("discord.js");

const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (
    message.embeds[0] &&
    message.embeds[0].title === "A wild pokémon has appeared!"
  ) {
    message.channel.send("Catch!");
  }
});

client.login(process.env.BOT_KEY);
