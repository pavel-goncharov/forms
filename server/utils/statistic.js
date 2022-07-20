import {Answer, PassageAnswer, PassageForm, PassageQuestion, Question, User} from '../models/tables.js';

export async function calcFormStatistic(formId, selectedQuestions = null, selectedUsers = null) {
  const filteredPassageQuestions = await getFilteredPassageQuestions(formId, selectedUsers, selectedQuestions);

  const questionsDb = await Question.findAll({where: {formId}});
  const questions = filterQuestionDb(questionsDb, selectedQuestions);

  const questionItems = [];
  for(const question of questions) {
    const totalNumberOfAnswers = await calcTotalNumberOfAnswers(question.id, filteredPassageQuestions);
    const questionItem = {
      id: question.id,
      title: question.title,
      answers: []
    };
    const answers = await Answer.findAll({where: {questionId: question.id}});
    for(const answer of answers) {
      const users = await getUsersChooseTheAnswer(answer.id, selectedUsers);
      const perCent = calcPerCent(totalNumberOfAnswers, users.length); 
      const answerItem = {
        id: answer.id,
        title: answer.title,
        totalNumberAnswers: totalNumberOfAnswers,
        perCent,
        number: users.length,
        users
      };
      questionItem.answers.push(answerItem);
    }
      questionItems.push(questionItem);
  }
  return questionItems;
}

async function getFilteredPassageQuestions(formId, selectedUsers = null, selectedQuestions = null) {
  const filteredPassageQuestions = [];
  const allPassages = await PassageForm.findAll({where: {formId}});
  for(const passage of allPassages) {
    if(!selectedUsers || selectedUsers.includes(passage.userId)) {
      const allPassageQuestions = await PassageQuestion.findAll({where: {passageFormId: passage.id}});
      for(const passageQuestion of allPassageQuestions) {
        if(!selectedQuestions || selectedQuestions.includes(passageQuestion.questionId)) filteredPassageQuestions.push(passageQuestion);
      }
    } 
  }
  return filteredPassageQuestions;
}

async function calcTotalNumberOfAnswers(questionId, filteredPassageQuestions) {
  const passageQuestions = filteredPassageQuestions.filter(passageQuestion => passageQuestion.questionId === questionId);
  let totalNumber = 0;
  for(const passageQuestion of passageQuestions) {
    const numberOfOnePassage = await PassageAnswer.count({where: {passageQuestionId: passageQuestion.id}});
    totalNumber += numberOfOnePassage;
  }
  return totalNumber;
}

function filterQuestionDb(questions, selectQuestions = null) {
  if(!selectQuestions) return questions;
  const filterQuestionDb = [];
  for(const question of questions) {
    if(selectQuestions.includes(question.id)) filterQuestionDb.push(question);
  }
  return filterQuestionDb;
}

function calcPerCent(totalNumber, numberOfPassage) {
  if(!totalNumber || !numberOfPassage) return 0;
  const perCent = Math.floor(100 * numberOfPassage / totalNumber);
  return perCent;
}

async function getUsersChooseTheAnswer(answerId, selectedUsers = null) {
  const users = [];
  const passageAnswers = await PassageAnswer.findAll({where: {answerId}});
  for(const passageAnswer of passageAnswers) {
    const passageQuestions = await PassageQuestion.findAll({where: {id: passageAnswer.passageQuestionId}});
    for(const passageQuestion of passageQuestions) {
      const passageForms = await PassageForm.findAll({where: {id: passageQuestion.passageFormId}});
      for(const passageForm of passageForms) {
        const user = await User.findByPk(passageForm.userId);
        if(!selectedUsers || selectedUsers.includes(user.id)) users.push(user.nickname);
      } 
    } 
  }
  return users; 
}