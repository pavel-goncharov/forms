import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sequelize from './database/config.js';
import * as tables from './models/tables.js';
import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.URL_CLIENT, 
  credentials: true
}));

app.use('/api', router);
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