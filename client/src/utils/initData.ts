import {IAnswer, IFormItem, IQuestion} from "../models/form";

export const initNickname: string = 'pawell';

export const initForms: IFormItem[] = [
  {id: 1, title: 'Form1', description: 'description1', questionCount: 11, authorNickname: 'user1'},
  {id: 2, title: 'Form2', description: 'description2', questionCount: 12, authorNickname: 'user2'},
  {id: 3, title: 'Form3', description: 'description3', questionCount: 13, authorNickname: 'user3'},
  {id: 4, title: 'Form4', description: 'description4', questionCount: 14, authorNickname: 'user4'},
  {id: 5, title: 'Form5', description: 'description5', questionCount: 15, authorNickname: 'user5'},
  {id: 6, title: 'Form6', description: 'description6', questionCount: 16, authorNickname: 'user6'},
  {id: 7, title: 'Form7', description: 'description7', questionCount: 17, authorNickname: 'user7'},
  {id: 8, title: 'Form8', description: 'description8', questionCount: 18, authorNickname: 'user8'},
  {id: 9, title: 'Form9', description: 'description9', questionCount: 19, authorNickname: 'user9'},
  {id: 10, title: 'Form10', description: 'description10', questionCount: 20, authorNickname: 'user10'},
];

export const initQuestions: IQuestion[] = [
  {id: 1, title: 'question1'},
  {id: 2, title: 'question2'},
  {id: 3, title: 'question3'},
];

export const initAnswers: IAnswer[] = [
  {id: 1, title: 'answer1.1', isSelected: false, countSelected: 10, idQuestion: 1},
  {id: 2, title: 'answer1.2', isSelected: false, countSelected: 20, idQuestion: 1},
  {id: 3, title: 'answer1.3', isSelected: false, countSelected: 70, idQuestion: 1},
  {id: 4, title: 'answer2.1', isSelected: false, countSelected: 30, idQuestion: 2},
  {id: 5, title: 'answer2.2', isSelected: false, countSelected: 40, idQuestion: 2},
  {id: 6, title: 'answer2.3', isSelected: false, countSelected: 30, idQuestion: 2},
  {id: 7, title: 'answer3.1', isSelected: false, countSelected: 10, idQuestion: 3},
  {id: 8, title: 'answer3.2', isSelected: false, countSelected: 0, idQuestion: 3},
  {id: 9, title: 'answer3.3', isSelected: false, countSelected: 90, idQuestion: 3}
];

export const initTitleForm: string = 'Form0';