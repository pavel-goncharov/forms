import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IQuestionFormPage } from "../../models/form";
import { SliceNames } from "../../utils/constants";

interface IIsCheckedAnswer {
  questionId: number; 
  answerId: number; 
}

interface PlayState {
  questions: IQuestionFormPage[];
}

const initialState: PlayState = {
  questions: []
}

const playSlice = createSlice({
  name: SliceNames.PLAY,
  initialState,
  reducers: {
    setPlayQuestions(state, action) {
      state.questions = action.payload;
    },
    setIsCheckedAnswer(state, action: PayloadAction<IIsCheckedAnswer>) {
      const {questionId, answerId} = action.payload;
      const question = state.questions.find(question => question.id === questionId);
      const answer = question?.answers.find(answer => answer.id === answerId);
      if(answer) answer.isChecked = !answer.isChecked;
    }
  }
});

export default playSlice;