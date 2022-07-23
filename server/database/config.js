import {Sequelize} from 'sequelize';

// export default new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     dialect: process.env.DB_DIALECT,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//   }
//   // 'postgres://pwsmafitklkenc:0a8e212c70915e27b34bd6c71a355e8452ea8bbca8eca9abc4606b7af1d7e21f@ec2-176-34-215-248.eu-west-1.compute.amazonaws.com:5432/dq78c0ktqu5c5?sslmode=require'
// );

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
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  },
});