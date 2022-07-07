import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {apiTags, API_URL, apiReducerPath, } from "../utils/constants";

const appApi = createApi({
  reducerPath: apiReducerPath,
  baseQuery: fetchBaseQuery({baseUrl: API_URL}),
  tagTypes: Object.values(apiTags),
  endpoints: () => ({})
});

export default appApi;