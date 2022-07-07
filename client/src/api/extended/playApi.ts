import { IPassage } from "../../models/play";
import calcDynamicUrl from "../../utils/calcDynamicUrl";
import {PlayUrls, HttpMethods} from "../../utils/constants";
import appApi from "../appApi";

const playApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    createPassage: build.mutation<string, IPassage>({
      query: (arg) => {
        const id = arg.id; 
        const passageForm = {userId: arg.userId, questions: arg.questions};
        return {
          url: calcDynamicUrl(PlayUrls.PASSAGE, id),
          method: HttpMethods.POST,
          body: passageForm
        } 
      }
    }), 
  })
});

export default playApi;