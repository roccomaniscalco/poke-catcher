import robot from "robotjs";
import debounce from "./util/debounce.js";

// type spam message
const spamMessage = debounce(() => {
  robot.typeString("spam");
  robot.keyTap("enter");
}, 1000);

// type catch command
const catchPokemon = async (pokemonName) => {
  robot.typeString(`p!catch ${pokemonName}`);
  robot.keyTap("enter");
};

const user = { catchPokemon, spamMessage };
export default user;
