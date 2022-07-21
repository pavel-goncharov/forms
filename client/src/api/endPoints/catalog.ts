import appApi from '../appApi';
import {ICatalogItem} from '../../types/form';
import {INewCatalogItemParams} from '../../types/catalog';
import {apiTags, CatalogUrls, HttpMethods} from '../../constants/api';

const catalogEndPoints = appApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCatalogItems: build.query<ICatalogItem[], void>({
      query: () => CatalogUrls.ITEMS,
      providesTags: [apiTags.form]
    }),
    createCatalogItem: build.mutation<number, INewCatalogItemParams>({
      query: (newCataloItem) => ({
        url: CatalogUrls.ITEMS,
        method: HttpMethods.POST,
        body: newCataloItem
      }),
      invalidatesTags: [apiTags.form]
    })
  })
});

export const {
  useFetchCatalogItemsQuery,
  useCreateCatalogItemMutation
} = catalogEndPoints;