import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IQuestion} from '../../types/form';
import {ICheckedAnswer} from '../../types/play';
import {SliceNames} from '../../constants/slices';
import {checkIfOneAnswerIsSelected} from '../../utils/play';

interface PlayState {
  questions: IQuestion[];
  notSelectedQuestions: number[];
  isErrorPlay: boolean;
  isModalLeftPlayWillBeShown: boolean;
}

const initialState: PlayState = {
  questions: [],
  notSelectedQuestions: [],
  isErrorPlay: false,
  isModalLeftPlayWillBeShown: false
}

const playSlice = createSlice({
  name: SliceNames.PLAY,
  initialState,
  reducers: {
    setPlayQuestions(state, action: PayloadAction<IQuestion[]>) {
      state.questions = action.payload;
    },
    setIsCheckedAnswer(state, action: PayloadAction<ICheckedAnswer>) {
      const {questionId, answerId} = action.payload;
      const question = state.questions.find(question => question.id === questionId);
      const answer = question?.answers.find(answer => answer.id === answerId);
      if(answer) answer.isChecked = !answer.isChecked;

      const oneAnswerIsSelected = checkIfOneAnswerIsSelected(state.questions);
      state.isModalLeftPlayWillBeShown = oneAnswerIsSelected;
    },
    setNotSelectedQuestions(state, action: PayloadAction<number[]>) {
      state.notSelectedQuestions = action.payload;
    },
    setIsErrorPlay(state, action: PayloadAction<boolean>) {
      state.isErrorPlay = action.payload;
    },
    setFalseToIsModalLeftPlayWillBeShown(state) {
      state.isModalLeftPlayWillBeShown = false;
    }
  }
});

export default playSlice;