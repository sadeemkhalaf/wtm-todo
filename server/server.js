
// Import all dependencies & middleware here
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Express from 'express';
import bodyParser from 'body-parser';
import todoController from './controller/todo.controller.js';

// Init an Express App.
const app = new Express();
dotenv.config();

// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use all controllers(APIs) here
app.use('/', todoController);
app.use('/add-todo', todoController);
app.use('/:id', todoController);

// Start Server here
app.listen(8080, () => {
  console.log('Server is running on port 8080!');
});


 mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
    if(error) {
      console.log('error');
      throw error;
    }

    console.log('db is running')
  });
  
// const collection = client.db("wtmTodoDB").collection("TODOs");
// Database admin:
// admin: SA
// password: FYVP7VGy182cUJIO

// mongodb://SA:FYVP7VGy182cUJIO@ds257698.mlab.com:57698/node-auth 
