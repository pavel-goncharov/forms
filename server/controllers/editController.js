import {User, Form, Question} from '../models/tables.js';
import {getInfoErrorsEdit, checkValidateEditForm, saveQuestions} from '../utils/edit.js'; 

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
    return res.json({success: 'Form info updated'});
  }

  async saveForm(req, res) {
    const formId = req.params.id;
    const questions = req.body;
    const infoErrorsEdit = getInfoErrorsEdit(questions);
    const isValidateEditForm = checkValidateEditForm(infoErrorsEdit);
    if(isValidateEditForm) {
      const dbQuestions = await Question.findAll({where: {formId}});
      await saveQuestions(questions, dbQuestions, formId);
      return res.json({success: 'The last changes are saved'});
    } else {
      return res.json({message: "Data is not validate"});
    }
  }
}

export default new EditController();