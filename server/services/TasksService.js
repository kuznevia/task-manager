import Task from "../models/Task.js";

class TasksService {
    async create(task) {
        const createdTask = await Task.create(task)
        return createdTask;
    }

    async getAll() {
        const tasks = await Task.find();
        return tasks
    }

    async getOne(id) {
        if (!id) {
            throw new Error('ID is not specified')
        }
        const post = await Task.findById(id);
        return post
    }

    async update(post) {
        if (!post._id) {
            throw new Error('ID is not specified')
        }
        const updatedPost = await Task.findByIdAndUpdate(post._id, post, { new: true })
        return updatedPost
    }

    async delete(id) {
        if (!id) {
            throw new Error('ID is not specified')
        }
        const post = await Task.findByIdAndDelete(id);
        return post;
    }
}

export default new TasksService();