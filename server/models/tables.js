import sequelize from '../database/config.js';
import {DataTypes} from 'sequelize';

const tableNames = {
  user: 'user',
  form: 'form',
  question: 'question',
  answer: 'answer',
  passageForm: 'passage_form',
  passageQuestion: 'passage_question',
  passageAnswer: 'passage_answer'
};

const idField = {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true};
const uniqueField = {type: DataTypes.STRING, unique: true, allowNull: false};
const notAllowNullField = {type: DataTypes.STRING, allowNull: false};
const defaultField = {type: DataTypes.STRING};

const User = sequelize.define(tableNames.user, {
  id: {...idField},
  nickname: {...uniqueField},
  email: {...uniqueField},
  password: {...notAllowNullField},
  refreshTokens: {type: DataTypes.ARRAY(DataTypes.STRING)}
});

const Form = sequelize.define(tableNames.form, {
  id: {...idField},
  title: {...notAllowNullField},
  description: {...defaultField}
});

const Question = sequelize.define(tableNames.question, {
  id: {...idField},
  title: {...notAllowNullField},
});

const Answer = sequelize.define(tableNames.answer, {
  id: {...idField},
  title: {...notAllowNullField},
});

const PassageForm = sequelize.define(tableNames.passageForm, {
  id: {...idField}
});

const PassageQuestion = sequelize.define(tableNames.passageQuestion, {
  id: {...idField}
});

const PassageAnswer = sequelize.define(tableNames.passageAnswer, {
  id: {...idField}
});

const tableRelationships = [
  {one: User, many: Form},
  {one: Form, many: Question},
  {one: Question, many: Answer},
  {one: Question, many: PassageQuestion},
  {one: Answer, many: PassageAnswer},
  {one: User, many: PassageForm},
  {one: Form, many: PassageForm},
  {one: PassageForm, many: PassageQuestion},
  {one: PassageQuestion, many: PassageAnswer}
];

for(const table of tableRelationships) {
  (table.one).hasMany(table.many);
  (table.many).belongsTo(table.one);
}

export {
  User,
  Form,
  Question,
  Answer,
  PassageForm,
  PassageQuestion,
  PassageAnswer
}