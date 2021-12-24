import log from "../util/log.js";
import myPokemon from "./myPokemon.js";
import user from "./userBot.js";

const state = {
  myPokemon: [],
  idsToRelease: [],
};

const onReady = () => {
  log.success("PokéReleaser Active");

  const pokemonToRelease = myPokemon.getPokemonToRelease();
  state.idsToRelease = pokemonToRelease.map(({ id }) => id);
};

const _parsePokemonString = (pokemon) => {
  const id = Number(pokemon.match(/(?<=`)(.*?)(?=`)/)[1]);
  const name = pokemon.match(/(?<=> )(.*?)(?=\*\*)/)[1];
  const level = Number(pokemon.match(/(?<=Lvl. )(.*?)(?=　•)/)[1]);
  const iv = Number(pokemon.match(/(\d*\.?\d*)(?=%)/)[1]);
  return { id, name, level, iv };
};

const getNextPageNumber = (pageFooter) => {
  const entryRangeLowerBound = pageFooter.text.match(/(\d+)(?=–)/)[1];
  return Math.ceil(entryRangeLowerBound / 20) + 1;
};

const onViewingPokemon = (messageEmbed) => {
  const pokemonStrings = messageEmbed.description.split("\n");
  pokemonStrings.forEach((pokemonString) => {
    state.myPokemon.push(_parsePokemonString(pokemonString));
  });
  user.viewPokemon(getNextPageNumber(messageEmbed.footer));
};

const onStoppedViewingPokemon = () => {
  myPokemon.writeMyPokemon(state.myPokemon);
};

const onClean = () => {
  onRelease();
};

const onConfirmRelease = () => {
  user.confirmRelease();
};

const onRelease = async () => {
  if (state.idsToRelease.length === 0) return;
  user.releasePokemon(state.idsToRelease.splice(0, 30));
};

const handler = {
  onReady,
  onViewingPokemon,
  onStoppedViewingPokemon,
  onClean,
  onConfirmRelease,
  onRelease,
};
export default handler;
