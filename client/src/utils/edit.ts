import {IInfoEditErrors, IEditQuestion} from '../types/edit';

export function getInfoErrorsEdit(editQuestions: IEditQuestion[]): IInfoEditErrors {
  const infoEditErrors: IInfoEditErrors = {
    isHaveQuestion: true,
    notMinNumberAnswers: [],
    emptyTitleQuestions: [],
    emptyTitleAnswers: []
  }

  if(!editQuestions.length) {
    infoEditErrors.isHaveQuestion = false;
  }

  for(let i = 0; i < editQuestions.length; i++) {
    const question = editQuestions[i];
    if(!question.title) {
      infoEditErrors.emptyTitleQuestions.push(i + 1);
    }
    
    const numberAnswers = question.answers.length; 
    if(numberAnswers < 2) {
      infoEditErrors.notMinNumberAnswers.push(i + 1);
    }

    for(let j = 0; j < numberAnswers; j++) {
      const answer = question.answers[j];
      if(!answer.title) {
        const itemEditError = {
          question: i + 1,
          answer: j + 1
        };
        infoEditErrors.emptyTitleAnswers.push(itemEditError);
      } 
    }
  }
  return infoEditErrors;
}

export function checkValidateEditForm(infoEditErrors: IInfoEditErrors): boolean {
  const isValidateEditForm = Boolean(
    infoEditErrors.isHaveQuestion &&
    !infoEditErrors.notMinNumberAnswers.length &&
    !infoEditErrors.emptyTitleQuestions.length &&
    !infoEditErrors.emptyTitleAnswers.length
  );
  return isValidateEditForm; 
}