import appApi from '../appApi';
import {generatePath} from 'react-router-dom';
import {IFilterItem, IQuestionStatistic, IArgCalcStatistic} from '../../types/statistic';
import {HttpMethods, StatisticUrls} from '../../constants/api';

const statisticEndPoints = appApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPassages: build.query<number, number>({
      query: (id) => generatePath(StatisticUrls.PASSAGES, {id: id.toString()})
    }),
    fetchFilterQuestions: build.query<IFilterItem[], number>({
      query: (id) => generatePath(StatisticUrls.FILTER_QUESTIONS, {id: id.toString()})
    }),
    fetchFilterUsers: build.query<IFilterItem[], number>({
      query: (id) => generatePath(StatisticUrls.FILTER_USERS, {id: id.toString()})
    }),
    calcStatistic: build.mutation<IQuestionStatistic[], IArgCalcStatistic>({
      query: (arg) => {
        const id = arg.id; 
        const filter = arg.filter;
        return {
          url: generatePath(StatisticUrls.STATISTIC, {id: id.toString()}),
          method: HttpMethods.POST,
          body: filter
        } 
      }
    }),
    fetchAllStatistic: build.query<IQuestionStatistic[], number>({
      query: (id) => generatePath(StatisticUrls.STATISTIC, {id: id.toString()})
    }), 
  })
});

export const {
  useFetchPassagesQuery,
  useFetchFilterQuestionsQuery,
  useFetchFilterUsersQuery,
  useCalcStatisticMutation,
  useFetchAllStatisticQuery
} = statisticEndPoints;