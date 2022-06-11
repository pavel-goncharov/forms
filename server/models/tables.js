import sequelize from '../database/config.js';
import {DataTypes} from 'sequelize';

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  nickname: {type: DataTypes.STRING, unique: true, allowNull: false},
  email: {type: DataTypes.STRING, unique: true, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false}
});

const Form = sequelize.define('form', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING}
});

const Question = sequelize.define('question', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
});

const Answer = sequelize.define('answer', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  isSelected: {type: DataTypes.BOOLEAN, allowNull: false}
});

const Result = sequelize.define('result', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

User.hasMany(Form);
Form.belongsTo(User);

Form.hasMany(Question);
Question.belongsTo(Form);

Question.hasMany(Answer);
Answer.belongsTo(Question);

User.hasMany(Result);
Result.belongsTo(User);

Form.hasMany(Result);
Result.belongsTo(Form);

export {
  User,
  Form,
  Question,
  Answer,
  Result
}