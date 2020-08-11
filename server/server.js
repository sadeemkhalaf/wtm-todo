
// Import all dependencies & middleware here
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Express from 'express';
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';
import todoController from './controller/todo.controller.js';
import userController from './controller/user.controller.js';
import jwtFunction from './config/passport.config.js';

// Init an Express App.
const app = new Express();
dotenv.config();

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

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
