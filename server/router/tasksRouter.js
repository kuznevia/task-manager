import Router from "express";
import TasksController from "../controllers/TasksController.js";

const tasksRouter = new Router();

tasksRouter.post('/add', TasksController.create)
tasksRouter.get('/', TasksController.getAll)
tasksRouter.get('/:id', TasksController.getOne)
tasksRouter.put('/', TasksController.update)
tasksRouter.delete('/posts/:id', TasksController.delete)



export default tasksRouter;