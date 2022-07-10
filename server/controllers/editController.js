import {Question, Answer, Form, User} from '../models/tables.js';

function getArrayOfId(arrayOfObject) {
  return arrayOfObject.map(obj => obj.id);
} 

async function dropOldItems(formId, currentItems) {
  const dbQuestions = await Question.findAll({where: {formId}});
  const dbQuestionsIds = getArrayOfId(dbQuestions);
  const currentQuestionsIds = getArrayOfId(currentItems);

  for(let i = 0; i < dbQuestionsIds.length; i++) {
    const questionId = dbQuestionsIds[i];
    const indexQuestion = currentQuestionsIds.indexOf(dbQuestionsIds[i]);
    if(indexQuestion === -1) {
      await Answer.destroy({where: {questionId}});
      await Question.destroy({where: {id: questionId}});
    } else {
      const dbQuestionAnswers = await Answer.findAll({where: {questionId}});
      const dbAnswersIds = getArrayOfId(dbQuestionAnswers);
      const currentAnswersIds = getArrayOfId(currentItems[indexQuestion].answers);
      for(const dbAnswerId of dbAnswersIds) {
        if(!currentAnswersIds.includes(dbAnswerId)) await Answer.destroy({where: {id: dbAnswerId}});
      } 
    }
  } 
}

async function updateItemsTitles(formId, currentItems) {
  const dbQuestions = await Question.findAll({where: {formId}});
  const dbQuestionIds = getArrayOfId(dbQuestions);
  for(let i = 0; i < currentItems.length; i++) {
    const indexCurrentQuestion = dbQuestionIds.indexOf(currentItems[i].id);
    if(indexCurrentQuestion !== -1) {
      const newQuestionTitle = currentItems[i].title;
      const currentDbQuestion = dbQuestions[indexCurrentQuestion];
      if(newQuestionTitle !== currentDbQuestion.title) await currentDbQuestion.update({title: newQuestionTitle});
      const currentQuestionAnswers = currentItems[i].answers;      
      const dbAnswers = await Answer.findAll({where: {questionId: currentDbQuestion.id}});
      const dbAnswerIds = getArrayOfId(dbAnswers);
      for(let i = 0; i < currentQuestionAnswers.length; i++) {
        const indexCurrentAnswer = dbAnswerIds.indexOf(currentQuestionAnswers[i].id);
        if(indexCurrentAnswer !== -1) {
          const newAnswerTitle = currentQuestionAnswers[i].title;
          const currentDbAnswer = dbAnswers[indexCurrentAnswer];
          if(newAnswerTitle !== currentDbAnswer.title) await currentDbAnswer.update({title: newAnswerTitle});
        }
      }
    } 
  }
}

async function createItems(formId, currentItems) {
  const dbQuestions = await Question.findAll({where: {formId}});
  const dbQuestionIds = getArrayOfId(dbQuestions);
  
  for(const currentItem of currentItems) {
    if(!dbQuestionIds.includes(currentItem.id)) {
      const newQuestionItem = await Question.create({title: currentItem.title, formId});
      for(const newAnswer of currentItem.answers) {
        await Answer.create({title: newAnswer.title, questionId: newQuestionItem.id});
      }
    } else {
      for(const currentAnswer of currentItem.answers) {
        const answerDb = await Answer.findByPk(currentAnswer.id);
        if(answerDb === null) {
          await Answer.create({title: currentAnswer.title, questionId: currentItem.id});
        }
      }
    }
  }
}

class EditController {
  async getInfoForm(req, res) {
    const id = req.params.id;
    const form = await Form.findByPk(id);
    const countQuestion = await Question.count({where: {formId: id}});
    const nicknameAuthor = await User.findByPk(form.userId).then(user => user.nickname);
    const formInfo = {
      title: form.title,
      description: form.description,
      questions: countQuestion,
      author: nicknameAuthor
    }
    return res.json(formInfo);
  }
  async updateInfoForm(req, res) {
    const id = req.params.id;
    const {newTitle, newDescription} = req.body;
    const form = await Form.findByPk(id);
    if(newTitle !== form.title) form.update({title: newTitle});
    if(newDescription !== form.description) form.update({description: newDescription});
    return res.json('Form info updated');
  }

  async saveForm(req, res) {
    const formId = req.params.id;
    const currentItems = req.body;
    dropOldItems(formId, currentItems);
    updateItemsTitles(formId, currentItems);
    createItems(formId, currentItems);
    return res.json('The last changes are saved');
  }

  // for postman

  // async createQuestion(req, res) {
  //   const formId = req.params.id;
  //   const {title} = req.body;
  //   const newQuestion = await Question.create({title, formId});
  //   return res.json(newQuestion);
  // } 
  // async createAnswer(req, res) {
  //   const questionId = req.params.id;
  //   const {title} = req.body;
  //   const newAnswer = await Answer.create({title, questionId});
  //   return res.json(newAnswer);
  // }
  // async deleteQuestion(req, res) {
  //   const id = req.params.id;
  //   await Question.destroy({where: {id}});
  //   return res.json('Question deleted');
  // }
  // async deleteAnswer(req, res) {
  //   const id = req.params.id;
  //   await Answer.destroy({where: {id}});
  //   return res.json('Answer deleted');
  // }
}

export default new EditController();