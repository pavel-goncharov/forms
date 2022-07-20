import { IQuestion } from '../types/form';
import { IPassageQuestion } from '../types/play';

export function getNotSelectedQuestions(playQuestions: IQuestion[]): number[] {
  const notSelectedQuestions = [];
  for(let i = 0; i < playQuestions.length; i++) {
    const answers = playQuestions[i].answers;
    for(let j = 0; j < answers.length; j++) {
      if(answers[j].isChecked) break;
      else if(j === answers.length - 1) notSelectedQuestions.push(i + 1);
    }
  }
  return notSelectedQuestions;
}

export function checkValidatePlayForm(notSelectedQuestions: number[]): boolean {
  return !Boolean(notSelectedQuestions.length);
}

export function checkIfOneAnswerIsSelected(playQuestions: IQuestion[]): boolean {
  for(const question of playQuestions) {
    const answers = question.answers;
    for(const answer of answers) {
      if(answer.isChecked) return true;
    }
  }
  return false;
}

export function calcFormatDataForSend(playQuestions: IQuestion[]): IPassageQuestion[] {
  const data = playQuestions.map(question => ({
    id: question.id, 
    answersId: question.answers.filter(answer => answer.isChecked).map(answer => answer.id)
  }));
  return data;
}