
// Import all dependencies & middleware here
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import todoController from './routes/todo.controller.js';
import userController from './routes/user.controller.js';
import jwtFunction from './config/passport.config.js';
import path from 'path';
import cors from 'cors';

// Init an Express App.
const app = new Express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  app.options('*', cors());

dotenv.config();
const port = process.env.PORT || 5000;

// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
jwtFunction(passport);

// use all controllers(APIs) here
app.use('/', userController);
app.use('/', todoController);

// Start Server here
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

mongoose.connect(process.env.DATABASE_URL || 'mongodb+srv://SA:FYVP7VGy182cUJIO@cluster0-vud2m.mongodb.net/wtmTodoDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (error) => {
  if (error) {
    throw error;
  }
  console.log('db is running')
});

app.use(Express.static('./client/build'));

app.get('*', (req, res) => {
  const moduleURL = new URL(import.meta.url);
  const __dirname = path.dirname(moduleURL.pathname);
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
