import appApi from '../appApi';
import {generatePath} from 'react-router-dom';
import {IArgsPassage, ICheckCorrectPassForm} from '../../types/play';
import {HttpMethods, PlayUrls} from '../../constants/api';

const playEndPoints = appApi.injectEndpoints({
  endpoints: (build) => ({
    createPassage: build.mutation<string, IArgsPassage>({
      query: (arg) => {
        const id = arg.id; 
        const questions = arg.questions;
        return {
          url: generatePath(PlayUrls.PASSAGE, {id: id.toString()}),
          method: HttpMethods.POST,
          body: questions
        } 
      }
    }),
    checkCorrectPassForm: build.query<ICheckCorrectPassForm, number>({
      query: (formId) => generatePath(PlayUrls.CHECK, {id: formId.toString()})
    })
  })
});

export const {
  useCreatePassageMutation,
  useCheckCorrectPassFormQuery
} = playEndPoints;