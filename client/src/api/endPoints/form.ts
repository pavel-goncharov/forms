import appApi from '../appApi';
import {generatePath} from 'react-router-dom';
import {IQuestion} from '../../types/form';
import {apiTags, FormUrls, HttpMethods} from '../../constants/api';

const formEndPoints = appApi.injectEndpoints({
  endpoints: (build) => ({
    deleteForm: build.mutation<string, number>({
      query: (formId) => ({
        url: generatePath(FormUrls.FORM, {id: formId.toString()}),
        method: HttpMethods.DELETE,
      }),
      invalidatesTags: [apiTags.form]
    }),
    fetchFormTitle: build.query<string, number>({
      query: (formId) => generatePath(FormUrls.TITLE, {id: formId.toString()}),
      providesTags: [apiTags.form]
    }),
    fetchQuestions: build.query<IQuestion[], number>({
      query: (formId) => generatePath(FormUrls.FORM, {id: formId.toString()}),
      providesTags: [apiTags.form]
    }),
    checkIsAuthorForm: build.query<boolean, number>({
      query: (formId) => generatePath(FormUrls.AUTHOR, {id: formId.toString()})
    })
  })
});

export const {
  useDeleteFormMutation,
  useFetchFormTitleQuery,
  useFetchQuestionsQuery,
  useCheckIsAuthorFormQuery
} = formEndPoints;