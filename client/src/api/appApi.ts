import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {apiReducerPath, apiTags, API_URL, credentials} from '../constants/api';

const appApi = createApi({
  reducerPath: apiReducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL, 
    credentials: credentials
  }),
  tagTypes: Object.values(apiTags),
  endpoints: () => ({})
});

export default appApi;