import delay from "../util/delay.js";
import log from "../util/log.js";
import myPokemon from "./myPokemon.js";
import user from "./userBot.js";

const onReady = () => {
  log.success("PokéReleaser Active");
};

const state = {
  myPokemon: [],
  idsToRelease: [],
};

const _parsePokemonString = (pokemon) => {
  const id = Number(pokemon.match(/(?<=`)(.*?)(?=`)/)[1]);
  const name = pokemon.match(/(?<=> )(.*?)(?=\*\*)/)[1];
  const level = Number(pokemon.match(/(?<=Lvl. )(.*?)(?=　•)/)[1]);
  const iv = Number(pokemon.match(/(\d*\.?\d*)(?=%)/)[1]);
  return { id, name, level, iv };
};

const _parsePokemonStrings = (pokemonStrings) => {
  return pokemonStrings.reduce((pokemons, pokemonString) => {
    const pokemon = _parsePokemonString(pokemonString);
    pokemons.push(pokemon);
    return pokemons;
  }, []);
};

const getNextPageNumber = (pageFooter) => {
  const entryRangeLowerBound = pageFooter.text.match(/(\d+)(?=–)/)[1];
  return Math.ceil(entryRangeLowerBound / 20) + 1;
};

const onViewingPokemon = (messageEmbed) => {
  const pokemonStrings = messageEmbed.description.split("\n");
  state.myPokemon.push(_parsePokemonStrings(pokemonStrings));
  user.viewPokemon(getNextPageNumber(messageEmbed.footer));
};

const onStoppedViewingPokemon = () => {
  myPokemon.writeMyPokemon(state.myPokemon);
};

const onClean = () => {
  const pokemonToRelease = myPokemon.getPokemonToRelease()
  state.idsToRelease = pokemonToRelease.map(({ id }) => id);

  user.releasePokemon(state.idsToRelease.splice(0, 30))
};

const onReleasingPokemon = async () => {
  user.confirmRelease();
  await delay(5000)

  if (state.idsToRelease.length === 0) return;
  user.releasePokemon(state.idsToRelease.splice(0, 30));
};

const handler = { onReady, onViewingPokemon, onStoppedViewingPokemon, onClean, onReleasingPokemon };
export default handler;
