
// Import all dependencies & middleware here
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Express from 'express';
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';
import todoController from './routes/todo.controller.js';
import userController from './routes/user.controller.js';
import jwtFunction from './config/passport.config.js';
import path, { dirname } from 'path';

// Init an Express App.
const app = new Express();
dotenv.config();
const port = process.env.PORT || 8080;

// Use your dependencies here
app.use(cors());
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
    console.log('error');
    throw error;
  }
  console.log('db is running')
});

app.use(Express.static('./client/build'));

app.get('*', (req, res) => {
  const moduleURL = new URL(import.meta.url);
  const __dirname = path.dirname(moduleURL.pathname);
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
})


console.log(JSON.stringify(import.meta));

const moduleURL = new URL(import.meta.url);
console.log(`pathname ${moduleURL.pathname}`);
console.log(`dirname ${path.dirname(moduleURL.pathname)}`);

const __dirname = path.dirname(moduleURL.pathname);

console.log(__dirname);
