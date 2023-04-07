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
            const tasks = await TasksService.getAll();
            return res.json(tasks);
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