import express from 'express';
import Todo from '../database/models/todo.model.js';
import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';


const todoController = express.Router();


/**
 * GET/
 * retrieve and display all Todo's in the Todo Model
 */

todoController.get('/all' , passport.authenticate('jwt', {session: false}),(req, res) => {
  const decoded = jsonwebtoken.decode(req.headers.authorization.split(' ')[1]);
  Todo.find({userId: decoded._id}, (error, result) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(result);
    } 
  });
});

/**
 * POST
 * Add a new Todo item to your database
 */
todoController.post('/add-todo', passport.authenticate(`jwt`, {session: false}), (req, res) => {
  const { todoDetails, isCompleted, createdOn } = req.body;
  const decoded = jsonwebtoken.decode(req.headers.authorization.split(' ')[1]);
  const userId = decoded._id;
  const todoData = {
    userId,
    todoDetails,
    isCompleted,
    createdOn
  };
  const newTodo = new Todo(todoData);
  newTodo
    .save()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

todoController.patch(`/todo/:id`, passport.authenticate(`jwt`, {session: false}), (req, res) => {
    try {
      const decoded = jsonwebtoken.decode(req.headers.authorization.split(' ')[1]);
      const userId = decoded._id;
      Todo.findOne({_id: req.params.id, userId: userId}).then(async (todo) => {
        todo.isCompleted = req.body.isCompleted;
        await todo.save().then((result) => {
          res.status(200).send(result);
        }, error => {
          res.status(400).send(error);
        })
      })
    } catch {
      res.status(500).send('server error');
    }
})

// get a todo item by its id
todoController.get('/todo/:id', passport.authenticate('jwt', {session: false}),(req, res) => {
  Todo.findById(req.params.id, (error, result) => {
    if(error) {
      res.status(400).send(error);
    } else {
      if(result) {
        res.status(200).json(result);
      } else {
        res.status(200).json(`not found`);
      }
      
    }
  })
});

todoController.delete(`/todo/:id`, passport.authenticate(`jwt`, {session: false}), (req, res) => {
  try {
  Todo.remove({_id: req.params.id}).then(() => {
    res.status(200).send(`deleted successfully`);
  });
  } catch {
    res.status(500).send('server error');
  }

})

export default todoController;