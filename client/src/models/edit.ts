export interface IFormInfo {
  title: string;
  description: string;
  questions: number;
  author: string;
}

export interface IDataInfo {
  formId: number;
  newTitle: string;
  newDescription: string;
}

interface IAnswerEditor {
  id: number;
  title: string;
}

export interface IQuestionEditor {
  id: number;
  title: string;
  answers: IAnswerEditor[];
}

export interface IArgsSaveTheChanges {
  formId: number;
  editQuestions: IQuestionEditor[];
}