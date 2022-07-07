import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IFilterQuestion, IFilterUser, IQuestionStatistic } from "../../models/statistic";
import { SliceNames } from "../../utils/constants";


interface StatisticState {
  statisticQuestions: IQuestionStatistic[],
  selectedQuestions: IFilterQuestion[];
  selectedUsers: IFilterUser[];
  isPerCent: boolean;
}

const initialState: StatisticState = {
  statisticQuestions: [],
  selectedQuestions: [],
  selectedUsers: [],
  isPerCent: true,
}

const statisticSlice = createSlice({
  name: SliceNames.STATISTIC,
  initialState,
  reducers: {
    setStatisticQuestions(state, action: PayloadAction<IQuestionStatistic[]>) {
      state.statisticQuestions = action.payload;
    },
    initialSetQuestions(state, action: PayloadAction<IFilterQuestion[]>) {
      state.selectedQuestions = action.payload;
    },
    addSelectedQuestion(state, action: PayloadAction<IFilterQuestion>) {
      state.selectedQuestions.push(action.payload);
    },
    deleteSelectedQuestion(state, action: PayloadAction<number>) {
      state.selectedQuestions = state.selectedQuestions.filter(question => question.id !== action.payload);
    },
    initialSetUsers(state, action: PayloadAction<IFilterUser[]>) {
      state.selectedUsers = action.payload;
    },
    addSelectedUser(state, action: PayloadAction<IFilterUser>) {
      state.selectedUsers.push(action.payload);
    },
    deleteSelectedUser(state, action: PayloadAction<number>) {
      state.selectedUsers = state.selectedUsers.filter(user => user.id !== action.payload);
    },
    changeIsPerCent(state) {
      state.isPerCent = !state.isPerCent; 
    }
  },
});

export default statisticSlice;