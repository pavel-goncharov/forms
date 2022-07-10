import { ICatalogItemDb, ICatalogItemParams } from "../../models/catalog";
import {ICatalogItem} from "../../models/form";
import {apiTags, CatalogUrls, HttpMethods} from "../../utils/constants";
import appApi from "../appApi";

const catalogApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    fetchItems: build.query<ICatalogItem[], null>({
      query: () => CatalogUrls.FORMS,
      providesTags: [apiTags.form]
    }),
    createItem: build.mutation<ICatalogItemDb, ICatalogItemParams>({
      query: (item) => ({
        url: CatalogUrls.CREATE,
        method: HttpMethods.POST,
        body: item
      }),
      invalidatesTags: [apiTags.form]
    })
  })
});

export default catalogApi;