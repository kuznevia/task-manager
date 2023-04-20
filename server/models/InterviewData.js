import mongoose from "mongoose";

const InterviewData = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    group: { type: String, required: true },
    subGroup: { type: String, required: true },
    link: { type: String, required: false },
    description: { type: String, required: false },
})

export default mongoose.model('InterviewData', InterviewData)