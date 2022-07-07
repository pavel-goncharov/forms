
export interface IFilterQuestion {
  id: number;
  title: string;
  isSelected: boolean;
}

export interface IFilterUser {
  id: number;
  nickname: string;
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

export interface calcStatisticArg {
  id: number;
  filter: {
    selectedQuestions: number[],
    selectedUsers: number[]
  }
}