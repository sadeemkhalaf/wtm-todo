import express from 'express';
import Todo from '../database/models/todo.model.js';

const todoController = express.Router();

/**
 * GET/
 * retrieve and display all Todo's in the Todo Model
 */
todoController.get('/', (req, res) => {
  Todo.find({}, (error, result) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(result);
    }
  })
});

/**
 * POST
 * Add a new Todo item to your database
 */
todoController.post('/add-todo', (req, res) => {
  const { userId, todoDetails, isCompleted, createdOn } = req.body;

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

todoController.patch(`/:id`, (req, res) => {
    try {
      Todo.findOne({_id: req.params.id}).then(async (todo) => {
        todo.isCompleted = req.body.isCompleted;
        await todo.save().then((result) => {
          res.status(200).send(result);
        }, error => {
          res.status(400).send(error);
        })
      })
    } catch {
      res.status(400).send('error');
    }
})

// get a todo item by its id
todoController.get('/:id', (req, res) => {
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

todoController.delete(`/:id`, (req, res) => {
  try {
  Todo.remove({_id: req.params.id}).then(() => {
    res.status(200).send(`deleted successfully`);
  });
  } catch {
    res.status(400).send('error');
  }

})

export default todoController;