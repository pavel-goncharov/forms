import {User, Question, PassageForm} from "../models/tables.js";
import {calcFormStatistic} from '../utils/statistic.js';

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
        title: nickname,
        isSelected: true,
      };
      passageUsers.push(passageUser);
    }
    return res.json(passageUsers);
  }

  async calcStatistic(req, res) {
    const formId = req.params.id;
    const {selectedQuestions, selectedUsers} = req.body;
    const questionItems = await calcFormStatistic(formId, selectedQuestions, selectedUsers);
    return res.json(questionItems);
  }

  async getAllStatistic(req, res) {
    const formId = req.params.id;
    const questionItems = await calcFormStatistic(formId);
    return res.json(questionItems);
  }
}

export default new StatisticController();