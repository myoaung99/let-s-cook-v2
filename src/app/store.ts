import counterSlice from "@/features/counter/counterSlice";
import { pokemonService } from "@/features/pokemon/pokemonService";
import { configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

export const store = () =>
  configureStore({
    reducer: {
      counter: counterSlice,
      // Add the generated reducer as a specific top-level slice
      [pokemonService.reducerPath]: pokemonService.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonService.middleware),
  });

export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: true });
