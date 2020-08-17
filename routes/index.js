
import userController from './user.controller';
import todoController from './todo.controller';
import path from 'path';
import Express from 'express';

const app = new Express();
const router = app.Router(); 

router.use((req, res) => {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});

export { userController, todoController };

