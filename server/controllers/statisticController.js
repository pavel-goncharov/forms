import {User, Question, PassageForm, Answer, PassageAnswer, PassageQuestion} from "../models/tables.js";

class StatisticController {

  async getCountPassage(req, res) {
    const id = req.params.id;
    const countPassage = await PassageForm.count({where: {formId: id}});
    return res.json(countPassage);
  }

  async getFilterQuestions(req, res) {
    const formId = req.params.id;
    const questionsDb = await Question.findAll({where: {formId}});
    const questions = questionsDb.map(question => ({
      id: question.id,
      title: question.title,
      isSelected: true,
    }));
    return res.json(questions);
  }

  async getFilterUsers(req, res) {
    const formId = req.params.id;
    const userIds = await PassageForm.findAll({where: {formId}}).then(passages => 
      passages.map(passage => passage.userId)
    );
    const passageUsers = [];
    for(const userId of userIds) {
      const nickname = await User.findOne({where: {id: userId}}).then(user => user.nickname);
      const passageUser = {
        id: userId,
        nickname,
        isSelected: true,
      };
      passageUsers.push(passageUser);
    }
    return res.json(passageUsers);
  }

  async calcStatistic(req, res) {
    const formId = req.params.id;
    const {selectedQuestions, selectedUsers} = req.body;

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
        const perCent = await calcPerCent(totalNumberOfAnswers, users.length); 
        const answerItem = {
          id: answer.id,
          title: answer.title,
          totalNumberAnswers: totalNumberOfAnswers,
          perCent: perCent.perCent,
          number: users.length,
          users
        };
        questionItem.answers.push(answerItem);
      }
      questionItems.push(questionItem);
    }
    return res.json(questionItems);
  }
}

async function getFilteredPassageQuestions(formId, selectedUsers, selectedQuestions) {
  const filteredPassageQuestions = [];
  const allPassages = await PassageForm.findAll({where: {formId}});
  for(const passage of allPassages) {
    if(selectedUsers.includes(passage.userId)) {
      const allPassageQuestions = await PassageQuestion.findAll({where: {passageFormId: passage.id}});
      for(const passageQuestion of allPassageQuestions) {
        if(selectedQuestions.includes(passageQuestion.questionId)) filteredPassageQuestions.push(passageQuestion);
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

function filterQuestionDb(questions, selectQuestions) {
  const filterQuestionDb = [];
  for(const question of questions) {
    if(selectQuestions.includes(question.id)) filterQuestionDb.push(question);
  }
  return filterQuestionDb;
}

async function calcPerCent(totalNumber, numberOfPassage) {
  const perCent = Math.floor(100 * numberOfPassage / totalNumber);
  const statistic = {
    perCent: perCent,
    number: numberOfPassage
  };
  return statistic;
}

async function getUsersChooseTheAnswer(answerId, selectedUsers) {
  const allUsers = [];
  const passageAnswers = await PassageAnswer.findAll({where: {answerId}});
  for(const passageAnswer of passageAnswers) {
    const passageQuestions = await PassageQuestion.findAll({where: {id: passageAnswer.passageQuestionId}});
    for(const passageQuestion of passageQuestions) {
      const passageForms = await PassageForm.findAll({where: {id: passageQuestion.passageFormId}});
      for(const passageForm of passageForms) {
        const user = await User.findByPk(passageForm.userId);
        allUsers.push(user);
      } 
    } 
  }
  const users = [];
  for(const user of allUsers) {
    if(selectedUsers.includes(user.id)) users.push(user.nickname);
  }
  return users; 
}

export default new StatisticController();