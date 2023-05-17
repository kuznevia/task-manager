import InterviewData from "../models/InterviewData.js";

class InterviewDataService {
  async create(data) {
    const createdTask = await InterviewData.create(data);
    return createdTask;
  }

  async getAll() {
    const tasks = await InterviewData.find();
    return tasks;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("ID is not specified");
    }
    const post = await InterviewData.findById(id);
    return post;
  }

  async update(data) {
    if (!data._id) {
      throw new Error("ID is not specified");
    }
    const updatedPost = await InterviewData.findByIdAndUpdate(data._id, data, {
      new: true,
    });
    return updatedPost;
  }

  async delete(id) {
    if (!id) {
      throw new Error("ID is not specified");
    }

    const record = await InterviewData.findByIdAndDelete(id);
    if (!record) {
      throw new Error("Record is not found");
    }

    return record;
  }
}

export default new InterviewDataService();
