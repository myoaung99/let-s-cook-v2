import { wrapper } from "@/app/store";
import { PokemonList } from "@/features/pokemon";
import { getPokemons } from "@/features/pokemon/pokemonService";
import { getRunningQueriesThunk } from "@/services/controller";
import React from "react";

const pokemons = () => {
  return (
    <div>
      <PokemonList />
    </div>
  );
};

export default pokemons;

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    store.dispatch(getPokemons.initiate({ limit: 10 }));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
      revalidate: 300,
    };
  }
);
