import Router from "express";
import TasksController from "../controllers/TasksController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const tasksRouter = new Router();

tasksRouter.post('/', authMiddleware, TasksController.create)
tasksRouter.get('/', authMiddleware, TasksController.getAll)
tasksRouter.get('/:id', authMiddleware, TasksController.getOne)
tasksRouter.put('/', authMiddleware, TasksController.update)
tasksRouter.delete('/:id', authMiddleware, TasksController.delete)



export default tasksRouter;