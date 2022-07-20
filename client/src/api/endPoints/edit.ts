import appApi from '../appApi';
import {generatePath} from 'react-router-dom';
import {IInfo, IArgsInfo, IArgsSaveChanges} from '../../types/edit';
import {ISuccess} from '../../types';
import {apiTags, EditUrls, HttpMethods} from '../../constants/api';

const editEndPoints = appApi.injectEndpoints({
  endpoints: (build) => ({
    fetchInfo: build.query<IInfo, number>({
      query: (id) => generatePath(EditUrls.INFO, {id: id.toString()}),
      providesTags: [apiTags.form]
    }), 
    updateInfo: build.mutation<ISuccess, IArgsInfo>({
      query: (arg) => {
        const id = arg.formId; 
        const updatedDataInfo = {
          newTitle: arg.newTitle, 
          newDescription: arg.newDescription
        };
        return {
          url: generatePath(EditUrls.INFO, {id: id.toString()}),
          method: HttpMethods.PUT,
          body: updatedDataInfo
        } 
      },
      invalidatesTags: [apiTags.form]
    }),
    saveChanges: build.mutation<ISuccess, IArgsSaveChanges>({
      query: (arg) => {
        const id = arg.formId; 
        const editQuestions = arg.editQuestions;
        return {
          url: generatePath(EditUrls.SAVE, {id: id.toString()}),
          method: HttpMethods.PUT,
          body: editQuestions
        } 
      },
      invalidatesTags: [apiTags.form]
    })
  })
});

export const {
  useFetchInfoQuery,
  useUpdateInfoMutation,
  useSaveChangesMutation
} = editEndPoints;