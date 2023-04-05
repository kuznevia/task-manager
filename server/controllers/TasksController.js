import Task from "../models/Task.js";

class TasksController { 
    async create(req, res) {
        try {
            const { name, deadline } = req.body
            const task = await Task.create({ name, deadline })
            res.json(task);
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getAll(req, res) {
        try {
            const tasks = await Task.find();
            return res.json(tasks);
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getOne(req, res) {
        try {
            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async update(req, res) {
        try {
            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async delete(req, res) {
        try {
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default new TasksController();