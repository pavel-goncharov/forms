import {Sequelize} from 'sequelize';

export default new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});