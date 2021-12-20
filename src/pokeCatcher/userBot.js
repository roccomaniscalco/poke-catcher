import robot from "robotjs";
import debounce from "../util/debounce.js";

const spam = debounce(() => {
  robot.typeString("spam");
  robot.keyTap("enter");
}, 1000);

const stop = () => {
  robot.typeString("stop ");
};

const catchPokemon = (pokemonName) => {
  robot.typeString(`p!catch ${pokemonName}`);
  robot.keyTap("enter");
};

const askForHint = () => {
  robot.typeString("p!hint");
  robot.keyTap("enter");
};

const user = { spam, stop, catchPokemon, askForHint };
export default user;
