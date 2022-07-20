export interface IArgsPassage {
  id: number;
  questions: IPassageQuestion[]
}

export interface IPassageQuestion {
  id: number;
  answersId: number[];
}

export enum PlayFormCheckMessages {
  NO_QUESTIONS = 'No questions',
  IS_PASSED = 'Already is passed',
  CORRECT = 'Correct'
}

export interface ICheckCorrectPassForm {
  message: PlayFormCheckMessages;
}

export interface ICheckedAnswer {
  questionId: number; 
  answerId: number; 
}