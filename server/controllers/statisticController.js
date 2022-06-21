import {User, Question, PassageForm, Answer, PassageAnswer, PassageQuestion} from "../models/tables.js";

class StatisticController {

  async getCountPassage(req, res) {
    const id = req.params.id;
    const countPassage = await PassageForm.count({where: {formId: id}});
    return res.json(countPassage);
  }

  async getFilter(req, res) {
    const formId = req.params.id;
    const questionsDb = await Question.findAll({where: {formId}});
    const questions = questionsDb.map(question => ({
      id: question.id,
      title: question.title
    }));
    const userIds = await PassageForm.findAll({where: {formId}}).then(passages => 
      passages.map(passage => passage.userId)
    );
    const passageUsers = [];
    for(const userId of userIds) {
      const nickname = await User.findOne({where: {id: userId}}).then(user => user.nickname);
      const passageUser = {
        id: userId,
        nickname,
      };
      passageUsers.push(passageUser);
    }
    const filter = {
      questions,
      users: passageUsers
    };
    return res.json(filter);
  }

  async getStatistic(req, res) {
    const id = req.params.id;
    const questions = await Question.findAll({where: {formId: id}});
    const questionItems = [];
    for(const question of questions) {
      const totalNumberAnswers = await calcTotalNumberAnswers(question.id);
      const questionItem = {
        id: question.id,
        title: question.title,
        answers: []
      };
      const answers = await Answer.findAll({where: {questionId: question.id}});
      for(const answer of answers) {
        const statisticOfAnswer = await calcStatisticOfAnswer(answer.id, totalNumberAnswers); 
        const users = await getUsersChooseAnswer(answer.id);
        const answerItem = {
          id: answer.id,
          title: answer.title,
          perCent: statisticOfAnswer.perCent,
          number: statisticOfAnswer.number,
          users,
        };
        questionItem.answers.push(answerItem);
      }
      questionItems.push(questionItem);
    }
    return res.json(questionItems);
  }
}

async function calcTotalNumberAnswers(questionId) {
  const passageQuestionIds = await PassageQuestion.findAll({where: {questionId}})
    .then(passageQuestions => passageQuestions.map(passageQuestion => passageQuestion.id));
  let totalNumber = 0;
  for(const passageQuestionId of passageQuestionIds) {
    const numberOfOnePassage = await PassageAnswer.count({where: {passageQuestionId}});
    totalNumber += numberOfOnePassage;
  }
  return totalNumber;
}

async function calcStatisticOfAnswer(answerId, totalNumber) {
  const numberOfPassage = await PassageAnswer.count({where: {answerId}});
  const perCent = Math.floor(100 * numberOfPassage / totalNumber);
  const statistic = {
    perCent: perCent,
    number: numberOfPassage
  };
  return statistic;
}

async function getUsersChooseAnswer(answerId) {
  const users = [];
  const passageAnswers = await PassageAnswer.findAll({where: {answerId}});
  for(const passageAnswer of passageAnswers) {
    const passageQuestions = await PassageQuestion.findAll({where: {id: passageAnswer.passageQuestionId}});
    for(const passageQuestion of passageQuestions) {
      const passageForms = await PassageForm.findAll({where: {id: passageQuestion.passageFormId}});
      for(const passageForm of passageForms) {
        const user = await User.findByPk(passageForm.userId);
        users.push(user.nickname);
      } 
    } 
  }
  return users; 
}

export default new StatisticController();