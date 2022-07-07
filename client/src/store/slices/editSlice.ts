import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IUpdatedQuestion, IQuestionFormPage, IAnswerDataAdd, IAnswerDataDelete, IAnswerDataUpdate} from "../../models/form";
import { SliceNames } from "../../utils/constants";

interface EditState {
  questions: IQuestionFormPage[];
}

const initialState: EditState = {
  questions: []
}

const editSlice = createSlice({
  name: SliceNames.EDIT,
  initialState,
  reducers: {
    setEditQuestions(state, action) {
      state.questions = action.payload;
    },
    addQuestion(state, action: PayloadAction<IQuestionFormPage>) {
      state.questions.push(action.payload);
    },
    deleteQuestion(state, action: PayloadAction<number>) {
      state.questions = state.questions.filter(question => question.id !== action.payload);
    },
    updateQuestion(state, action: PayloadAction<IUpdatedQuestion>) {
      const {id, newValue} = action.payload;
      const question = state.questions.find(question => question.id === id);
      if(question) question.title = newValue;
    },
    addAnswer(state, action: PayloadAction<IAnswerDataAdd>) {
      const {questionId, newAnswer} = action.payload;
      const question = state.questions.find(question => question.id === questionId);
      if(question) question.answers.push(newAnswer);
    },
    deleteAnswer(state, action: PayloadAction<IAnswerDataDelete>) {
      const {questionId, id} = action.payload;
      const newQuestions: IQuestionFormPage[] = [];
      state.questions.forEach(question => {
        if(question.id === questionId) question.answers = question.answers.filter(answer => answer.id !== id);
        newQuestions.push(question);        
      });
      state.questions = newQuestions;
    },
    updateAnswer(state, action: PayloadAction<IAnswerDataUpdate>) {
      const {questionId, id, title} = action.payload;
      const question = state.questions.find(question => question.id === questionId);
      if(question) {
        const answer = question.answers.find(answer => answer.id === id);
        if(answer) answer.title = title;
      }
    }
  }
});

export default editSlice;