import { IQuestionFormPage } from "../../models/form";
import calcDynamicUrl from "../../utils/calcDynamicUrl";
import {apiTags, FormUrls, HttpMethods} from "../../utils/constants";
import appApi from "../appApi";

const formApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    deleteItem: build.mutation<string, number>({
      query: (id) => ({
        url: calcDynamicUrl(FormUrls.DELETE, id),
        method: HttpMethods.DELETE,
      }),
      invalidatesTags: [apiTags.catalog]
    }),
    fetchTitle: build.query<string, number>({
      query: (id) => calcDynamicUrl(FormUrls.TITLE, id),
      providesTags: [apiTags.form]
    }),
    fetchQuestionItems: build.query<IQuestionFormPage[], number>({
      query: (id) => calcDynamicUrl(FormUrls.ITEMS, id) 
    }),
    fetchAuthor: build.query<number, string>({
      query: (id) => FormUrls.AUTHOR + id
    }), 
  })
});

export default formApi;