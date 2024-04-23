import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { connect } from 'mongoose';
import indexRouter from './routes/index';
import usersRouter from './routes/user/user.router';
import { authController } from './routes/auth/auth.controller';
import dotenv from 'dotenv';

/* Load environment variables */
dotenv.config();
const app = express();
const mongoDB_uri = 'mongodb+srv://vercel-admin-user:3uBCyfzWvhi5qCfS@calvino.fbentqz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// connect to database
connect(mongoDB_uri, { dbName: "paybook" })
  .then(() => console.log("Connect successfully!"))
  .catch((err) => console.log("Connect failed!", "\n", "Error: " + err.message));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/login', authController.login);
app.post('/register', authController.register);

export default app;
