import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IInfoEditErrors} from '../../types/edit';
import {IUpdatedQuestion, IQuestion, IAnswerDataAdd, IAnswerDataDelete, IAnswerDataUpdate} from '../../types/form';
import {SliceNames} from '../../constants/slices';

interface EditState {
  questions: IQuestion[];
  infoErrorsEdit: IInfoEditErrors | null;
  isErrorEdit: boolean;
  isModalLeftWillBeShown: boolean;
}

const initialState: EditState = {
  questions: [],
  infoErrorsEdit: null,
  isErrorEdit: false,
  isModalLeftWillBeShown: false
}

const editSlice = createSlice({
  name: SliceNames.EDIT,
  initialState,
  reducers: {
    setEditQuestions(state, action: PayloadAction<IQuestion[]>) {
      state.questions = action.payload;
    },
    addQuestion(state, action: PayloadAction<IQuestion>) {
      state.questions.push(action.payload);
      state.isModalLeftWillBeShown = true;
    },
    deleteQuestion(state, action: PayloadAction<number>) {
      state.questions = state.questions.filter(question => question.id !== action.payload);
      state.isModalLeftWillBeShown = true;
    },
    updateQuestion(state, action: PayloadAction<IUpdatedQuestion>) {
      const {id, newValue} = action.payload;
      const question = state.questions.find(question => question.id === id);
      if(question) question.title = newValue;
      state.isModalLeftWillBeShown = true;
    },
    addAnswer(state, action: PayloadAction<IAnswerDataAdd>) {
      const {questionId, newAnswer} = action.payload;
      const question = state.questions.find(question => question.id === questionId);
      if(question) question.answers.push(newAnswer);
      state.isModalLeftWillBeShown = true;
    },
    deleteAnswer(state, action: PayloadAction<IAnswerDataDelete>) {
      const {questionId, id} = action.payload;
      const newQuestions: IQuestion[] = [];
      state.questions.forEach(question => {
        if(question.id === questionId) question.answers = question.answers.filter(answer => answer.id !== id);
        newQuestions.push(question);        
      });
      state.questions = newQuestions;
      state.isModalLeftWillBeShown = true;
    },
    updateAnswer(state, action: PayloadAction<IAnswerDataUpdate>) {
      const {questionId, id, title} = action.payload;
      const question = state.questions.find(question => question.id === questionId);
      if(question) {
        const answer = question.answers.find(answer => answer.id === id);
        if(answer) answer.title = title;
      }
      state.isModalLeftWillBeShown = true;
    },
    setInfoErrorsEdit(state, action: PayloadAction<IInfoEditErrors | null>) {
      state.infoErrorsEdit = action.payload;
    },
    setIsErrorEdit(state, action: PayloadAction<boolean>) {
      state.isErrorEdit = action.payload;
    },
    setFalseToIsModalLeftEditWillBeShown(state) {
      state.isModalLeftWillBeShown = false;
    }
  }
});

export default editSlice;