import {Question, Answer, PassageAnswer, PassageQuestion} from '../models/tables.js';
 
export function getInfoErrorsEdit(currentItems) {
  const infoEditErrors = {
    isHaveQuestion: true,
    notMinNumberAnswers: [],
    emptyTitleQuestions: [],
    emptyTitleAnswers: []
  }

  if(!currentItems.length) {
    infoEditErrors.isHaveQuestion = false;
  }

  for(let i = 0; i < currentItems.length; i++) {
    const question = currentItems[i];
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

export function checkValidateEditForm(infoEditErrors) {
  const isValidateEditForm = Boolean(
    infoEditErrors.isHaveQuestion &&
    !infoEditErrors.notMinNumberAnswers.length &&
    !infoEditErrors.emptyTitleQuestions.length &&
    !infoEditErrors.emptyTitleAnswers.length
  );
  return isValidateEditForm; 
}

export async function deleteItems(items, dbItems, isQuestion) {
  for(let i = 0; i < dbItems.length; i++) {
    const dbItem = dbItems[i];
    const item = items.find(item => item.id === dbItem.id);
    if(!item) {
      await dbItem.destroy();
      if(isQuestion) {
        await Answer.destroy({where: {questionId: null}});
        await PassageAnswer.destroy({where: {answerId: null}});
        await PassageQuestion.destroy({where: {questionId: null}});
      } else {
        await PassageAnswer.destroy({where: {answerId: null}});
      } 
    }
  }
}

export async function saveQuestions(questions, dbQuestions, formId) {
  await deleteItems(questions, dbQuestions, true);
  const restQuestions = await Question.findAll({where: {formId}});

  for(let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const restQuestion = restQuestions.find(restQuestion => restQuestion.id === question.id);
    let restQuestionId;
    if(restQuestion) {
      if(restQuestion.title !== question.title) await restQuestion.update({title: question.title});
      restQuestionId = restQuestion.id;
    } else {
      const newQuestion = await Question.create({title: question.title, formId});
      restQuestionId = newQuestion.id; 
    }
    // answers
    const answers = question.answers;
    const dbAnswers = await Answer.findAll({where: {questionId: restQuestionId}});
    await saveAnswers(answers, dbAnswers, restQuestionId);
  }
}

async function saveAnswers(answers, dbAnswers, questionId) {
  await deleteItems(answers, dbAnswers, false);
  const restAnswers = await Answer.findAll({where: {questionId}});

  for(let i = 0; i < answers.length; i++) {
    const answer = answers[i];
    const restAnswer = restAnswers.find(restAnswer => restAnswer.id === answer.id);
    if(restAnswer) {
      if(restAnswer.title !== answer.title) await restAnswer.update({title: answer.title});
    } else {
      await Answer.create({title: answer.title, questionId});
    }
  }
}