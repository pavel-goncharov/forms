import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IFilterItem, IQuestionStatistic } from '../../types/statistic';
import {SliceNames} from '../../constants/slices';

interface StatisticState {
  statisticQuestions: IQuestionStatistic[],
  selectedQuestions: IFilterItem[];
  selectedUsers: IFilterItem[];
  isPerCent: boolean;
  isShowCompleteAnswer: boolean;
  isShowUsers: boolean;
}

const initialState: StatisticState = {
  statisticQuestions: [],
  selectedQuestions: [],
  selectedUsers: [],
  isPerCent: true,
  isShowCompleteAnswer: false,
  isShowUsers: false,
}

const statisticSlice = createSlice({
  name: SliceNames.STATISTIC,
  initialState,
  reducers: {
    setStatisticQuestions(state, action: PayloadAction<IQuestionStatistic[]>) {
      state.statisticQuestions = action.payload;
    },
    addSelectedQuestion(state, action: PayloadAction<IFilterItem>) {
      state.selectedQuestions.push(action.payload);
    },
    deleteSelectedQuestion(state, action: PayloadAction<number>) {
      state.selectedQuestions = state.selectedQuestions.filter(question => question.id !== action.payload);
    },
    addSelectedUser(state, action: PayloadAction<IFilterItem>) {
      state.selectedUsers.push(action.payload);
    },
    deleteSelectedUser(state, action: PayloadAction<number>) {
      state.selectedUsers = state.selectedUsers.filter(user => user.id !== action.payload);
    },
    changeIsPerCent(state) {
      state.isPerCent = !state.isPerCent; 
    },
    changeIsShowCompleteAnswer(state) {
      state.isShowCompleteAnswer = !state.isShowCompleteAnswer; 
    },
    changeIsShowUsers(state) {
      state.isShowUsers = !state.isShowUsers;
    }
  },
});

export default statisticSlice;