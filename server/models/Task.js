import mongoose from "mongoose";

const Task = new mongoose.Schema({
    name: { type: String, required: true },
    deadline: { type: Date, required: true },
    userId: { type: String, required: true }
})

export default mongoose.model('Task', Task)