import mongoose from "mongoose";

const Task = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: false },
  description: { type: String, required: true },
  userId: { type: String, required: true },
});

export default mongoose.model("Task", Task);
