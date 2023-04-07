import Task from "../models/Task.js";
import TasksService from "../services/TasksService.js";

class TasksController { 
    async create(req, res) {
        try {
            const task = await TasksService.create(req.body)
            res.json(task);
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getAll(req, res) {
        try {
            const userId = req.query.userId
            if (!userId) {
                return res.status(403).json({ message: 'no userId is specified '})
            }

            const tasks = await TasksService.getAll();
            const filteredTasks = tasks.filter((task) => task.userId === userId);

            return res.json(filteredTasks);
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getOne(req, res) {
        try {
            const post = await TasksService.getOne(req.params.id);
            return res.json(post)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await TasksService.update(req.body)
            return res.json(updatedPost);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    async delete(req, res) {
        try {
            const post = await TasksService.delete(req.params.id);
            return res.json(post);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

export default new TasksController();