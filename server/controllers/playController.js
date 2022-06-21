import {PassageForm, PassageQuestion, PassageAnswer} from "../models/tables.js";

class PlayController {
  async createPassage(req, res) {
    const currentFormId = req.params.id;
    const {userId, questions} = req.body;
    const newPassage = await PassageForm.create({userId, formId: currentFormId});
    for(const questionId in questions) {
      const newPassageQuestion = await PassageQuestion.create({passageFormId: newPassage.id, questionId: Number(questionId)});
      const idSelectedAnswers = questions[questionId];
      for(const idAnswer of idSelectedAnswers) {
        await PassageAnswer.create({passageQuestionId: newPassageQuestion.id, answerId: idAnswer});
      }
    }
    return res.json('New passage saved');
  }
}

export default new PlayController();