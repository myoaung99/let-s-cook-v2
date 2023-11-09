import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import globalSlice from '@/app/globalSlice';
import { recipesService } from '@/features/Recipes/components/recipesService';
import authSlice from '@/features/authentication/authSlice';

export const store = () =>
    configureStore({
        reducer: {
            global: globalSlice,
            auth: authSlice,
            // Add the generated reducer as a specific top-level slice
            [recipesService.reducerPath]: recipesService.reducer,
        },
        // Adding the api middleware enables caching, invalidation, polling,
        // and other useful features of `rtk-query`.
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(recipesService.middleware),
    });

export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(store, { debug: true });
