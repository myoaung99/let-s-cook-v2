import { baseApi } from "@/services/controller";

export const pokemonService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPokemons: build.query({
      query: (payload) => `pokemon?limit=${payload.limit}`,
    }),
  }),
  overrideExisting: false,
});

export const { getPokemons } = pokemonService.endpoints;
export const { useGetPokemonsQuery } = pokemonService;
