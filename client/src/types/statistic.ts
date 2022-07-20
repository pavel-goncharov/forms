export interface IFilterItem {
  id: number;
  title: string;
  isSelected: boolean;
}

export interface IAnswerStatistic {
  id: number;
  title: string;
  perCent: number;
  number: number;
  users: string[];
}

export interface IQuestionStatistic {
  id: number;
  title: string;
  answers: IAnswerStatistic[];
}

export interface IArgCalcStatistic {
  id: number;
  filter: IFilterCalcStatistic;
}

export interface IFilterCalcStatistic {
  selectedQuestions: number[];
  selectedUsers: number[];
}