import { ReactElement} from 'react';

export interface ICatalogItem {
  id: number;
  title: string;
  description?: string;
  questions: number;
  author: string;
}

export interface IModalInfo {
  visible: boolean;
  setVisible: (visible: boolean) => void; 
}

export interface IQuestion {
  id: number;
  title: string;
}

export interface IAnswer {
  id: number;
  title: string;
  isSelected: boolean;
  countSelected: number;
  idQuestion: number;
}

export interface IAnswerFormPage {
  id: number;
  title: string;
  isChecked: boolean;
}

export interface IQuestionFormPage {
  id: number;
  title: string;
  answers: IAnswerFormPage[];
}

export interface ITagsAndExtra {
  tags: ReactElement[],
  extra: ReactElement[]
}

export interface IAnswerDataUpdate {
  questionId: number;
  id: number;
  title: string;
}

export interface IAnswerDataDelete {
  questionId: number;
  id: number;
}

export interface IAnswerDataAdd {
  questionId: number;
  newAnswer: IAnswerFormPage;
}

export interface IUpdatedQuestion {
  id: number; 
  newValue: string;
}