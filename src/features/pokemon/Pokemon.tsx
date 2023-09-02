import React from "react";
import { useGetPokemonsQuery } from "./pokemonService";
import { Pokemon } from "@/types";
import { useRouter } from "next/router";

export const PokemonList = () => {
  const router = useRouter();
  const { data } = useGetPokemonsQuery({ skip: router.isFallback });
  return (
    <div>
      <p>Pokemon List</p>
      <ul>
        {data?.results?.map((pokemon: Pokemon) => (
          <li key={pokemon?.name}>- {pokemon?.name}</li>
        ))}
      </ul>
    </div>
  );
};
