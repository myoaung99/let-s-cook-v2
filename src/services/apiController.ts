// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

// initialize an empty api service that we'll inject endpoints into later as needed
export const backendApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://lets-cook-backend.onrender.com/api/v1/',
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    tagTypes: [],
    endpoints: () => ({}),
});

// Export hooks for usage in functional components
export const {
    util: { getRunningQueriesThunk },
} = backendApi;
