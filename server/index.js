import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sequelize from './database/config.js';
import * as tables from './models/tables.js';
import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';
import verifyJWT from './middleware/verifyJWT.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Better pub middle pri ??????????????????????????????????????????????????
app.use('/api', router);
app.use(verifyJWT);
app.use(errorHandler);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch(e) {
    console.log(e);
  }
}

start();