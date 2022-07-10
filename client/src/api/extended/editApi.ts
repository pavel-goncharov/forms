import {IArgsSaveTheChanges, IDataInfo, IFormInfo} from "../../models/edit";
import calcDynamicUrl from "../../utils/calcDynamicUrl";
import {apiTags, EditUrls, HttpMethods} from "../../utils/constants";
import appApi from "../appApi";

const editApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getInfo: build.query<IFormInfo, number>({
      query: (id) => calcDynamicUrl(EditUrls.INFO, id),
      providesTags: [apiTags.form]

    }), 
    updateInfo: build.mutation<string, IDataInfo>({
      query: (arg) => {
        const id = arg.formId; 
        const info = {newTitle: arg.newTitle, newDescription: arg.newDescription};
        return {
          url: calcDynamicUrl(EditUrls.INFO, id),
          method: HttpMethods.PUT,
          body: info
        } 
      },
      invalidatesTags: [apiTags.form]
    }),
    saveTheChanges: build.mutation<string, IArgsSaveTheChanges>({
      query: (arg) => {
        const id = arg.formId; 
        const editQuestions = arg.editQuestions;
        return {
          url: calcDynamicUrl(EditUrls.SAVE, id),
          method: HttpMethods.PUT,
          body: editQuestions
        } 
      },
      invalidatesTags: [apiTags.form]
    }),
  })
});

export default editApi;