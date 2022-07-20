export interface IInfo {
  title: string;
  description: string;
  questions: number;
  author: string;
}

export interface IArgsInfo {
  formId: number;
  newTitle: string;
  newDescription: string;
}

interface IEditAnswer {
  id: number;
  title: string;
}

export interface IEditQuestion {
  id: number;
  title: string;
  answers: IEditAnswer[];
}

export interface IArgsSaveChanges {
  formId: number;
  editQuestions: IEditQuestion[];
}

export interface IInfoEditErrors {
  isHaveQuestion: boolean;
  notMinNumberAnswers: number[];
  emptyTitleQuestions: number[];
  emptyTitleAnswers: IEmptyTitleAnswer[];
}

export interface IEmptyTitleAnswer {
  question: number;
  answer: number;
}