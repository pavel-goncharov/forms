import {Answer, Form, Question, User} from "../models/tables.js";

class FormController {
  async getQuestionItems(req, res) {
    const id = req.params.id;
    const questions = await Question.findAll({where: {formId: id}});
    const questionItems = [];
    for(const question of questions) {
      const questionItem = {
        id: question.id,
        title: question.title,
        answers: []
      };
      const answers = await Answer.findAll({where: {questionId: question.id}});
      for(const answer of answers) {
        const answerItem = {
          id: answer.id,
          title: answer.title,
          isChecked: false
        };
        questionItem.answers.push(answerItem);
      }
      questionItems.push(questionItem);
    }
    return res.json(questionItems);
  }

  async getFormTitle(req, res) {
    const id = req.params.id;
    const formTitle = await Form.findByPk(id).then(form => form.title);
    return res.json(formTitle);
  }
  
  async getAuthor(req, res) {
    const id = req.params.id;
    const idAuthor = await Form.findOne({where: {userId: id}}).then(form => form.userId);
    const author = await User.findOne({where: {id: idAuthor}}).then(user => user.nickname);
    return res.json(author);
  }
  
  async deleteForm(req, res) {
    const id = req.params.id;
    const formTitle = await Form.findByPk(id).then(form => form.title);
    await Form.destroy({where: {id: id}});
    const message = `Form ${formTitle} deleted`;
    return res.json(message);
  }
}

export default new FormController();