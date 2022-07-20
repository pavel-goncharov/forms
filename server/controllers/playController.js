import {PassageForm, PassageQuestion, PassageAnswer, Form, Question} from "../models/tables.js";

class PlayController {
  async createPassage(req, res) {
    const currentFormId = req.params.id;
    const questions = req.body;
    const userId = req.user.id;
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

  async checkIsCorrectToPassForm(req, res) {
    const formId = req.params.id;

    const question = await Question.findOne({where: {formId}});
    const isHaveQuestion = Boolean(question);
    if(!isHaveQuestion) {
      return res.status(200).json({message: 'No questions'});
    }

    const userId = req.user.id;

    const passage = await PassageForm.findOne({where: {formId, userId}});
    const isUserPassed = Boolean(passage);
    if(isUserPassed) {
      return res.status(200).json({message: 'Already is passed'});
    } 

    return res.status(200).json({message: 'Correct'});
  }
}

export default new PlayController();