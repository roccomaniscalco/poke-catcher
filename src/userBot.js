import robot from "robotjs";
import debounce from "./util/debounce.js";

const spam = debounce(() => {
  robot.typeString("spam");
  robot.keyTap("enter");
}, 1000);

const catchPokemon = (pokemonName) => {
  robot.typeString(`p!catch ${pokemonName}`);
  robot.keyTap("enter");
};

const askForHint = () => {
  robot.typeString("p!hint");
  robot.keyTap("enter");
};

const user = { spam, catchPokemon, askForHint };
export default user;
