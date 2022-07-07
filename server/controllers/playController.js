import {PassageForm, PassageQuestion, PassageAnswer, Form} from "../models/tables.js";

class PlayController {
  async createPassage(req, res) {
    const currentFormId = req.params.id;
    const {userId, questions} = req.body;
    const newPassage = await PassageForm.create({userId, formId: currentFormId});
    for(const question of questions) {
      const newPassageQuestion = await PassageQuestion.create({passageFormId: newPassage.id, questionId: question.id});
      const idSelectedAnswers = question.answersId;
      for(const idAnswer of idSelectedAnswers) {
        await PassageAnswer.create({passageQuestionId: newPassageQuestion.id, answerId: idAnswer});
      }
    }
    const formTitle = await Form.findByPk(currentFormId).then(form => form.title);
    return res.json(`Your passage the ${formTitle} has been saved`);
  }
}

export default new PlayController();