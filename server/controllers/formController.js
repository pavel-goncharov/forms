import {Answer, Form, PassageAnswer, PassageForm, PassageQuestion, Question} from "../models/tables.js";

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
    return res.status(200).json(formTitle);
  }
  
  async deleteForm(req, res) {
    const id = req.params.id;

    const formTitle = await Form.findByPk(id).then(form => form.title);
    await Form.destroy({where: {id: id}});
    const message = `Form ${formTitle} deleted`;

    await PassageForm.destroy({where: {formId: null}});

    await Question.destroy({where: {formId: null}});
    await PassageQuestion.destroy({where: {questionId: null}});

    await Answer.destroy({where: {questionId: null}});
    await PassageAnswer.destroy({where: {answerId: null}});

    return res.json(message);
  }

  async checkIsAuthorForm(req, res) {
    const id = req.params.id;
    const userId = req.user.id;
    const form = await Form.findOne({where: {id, userId}});
    const isAuthor = Boolean(form);
    return res.status(200).json(isAuthor);  
  }
}

export default new FormController();