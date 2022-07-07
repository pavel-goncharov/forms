import {calcStatisticArg, IFilterQuestion, IFilterUser, IQuestionStatistic} from "../../models/statistic";
import calcDynamicUrl from "../../utils/calcDynamicUrl";
import {HttpMethods, StatisticUrls} from "../../utils/constants";
import appApi from "../appApi";

const statisticApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPassages: build.query<number, number>({
      query: (id) => calcDynamicUrl(StatisticUrls.PASSAGES, id)
    }),
    fetchFilterQuestions: build.query<IFilterQuestion[], number>({
      query: (id) => calcDynamicUrl(StatisticUrls.FILTER_QUESTIONS, id)
    }),
    fetchFilterUsers: build.query<IFilterUser[], number>({
      query: (id) => calcDynamicUrl(StatisticUrls.FILTER_USERS, id)
    }),
    calcStatistic: build.mutation<IQuestionStatistic[], calcStatisticArg>({
      query: (arg) => {
        const id = arg.id; 
        const filter = arg.filter;
        return {
          url: calcDynamicUrl(StatisticUrls.STATISTIC, id),
          method: HttpMethods.POST,
          body: filter
        } 
      }
    }), 
  })
});

export default statisticApi;