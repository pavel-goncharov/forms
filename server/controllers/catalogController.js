import {Form, Question, User} from '../models/tables.js';

class CatalogController {
  async createForm(req, res) {
    const {title, description, userId} = req.body;
    const newForm = await Form.create({title, description, userId});
    return res.json(newForm);
  }

  async getAllCatalogItems(req, res) {
    const formItems = [];
    const forms = await Form.findAll();
    for(const form of forms) {
      const countQuestion = await Question.count({where: {formId: form.id}});
      const userId = await Form.findByPk(form.id).then(form => form.userId);
      const nicknameAuthor = await User.findByPk(userId).then(user => user.nickname);
      const formItem = {
        id: form.id,
        title: form.title,
        description: form.description,
        questions: countQuestion,
        author: nicknameAuthor
      }
      formItems.push(formItem);
    }
    return res.json(formItems);
  } 
}

export default new CatalogController();