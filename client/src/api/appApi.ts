import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {apiReducerPath, apiTags, credentials} from '../constants/api';

const appApi = createApi({
  reducerPath: apiReducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL, 
    credentials: credentials
  }),
  tagTypes: Object.values(apiTags),
  endpoints: () => ({})
});

export default appApi;