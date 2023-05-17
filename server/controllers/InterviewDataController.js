import InterviewDataService from "../services/InterviewDataService.js";

class InterviewDataController {
  async create(req, res) {
    try {
      const data = await InterviewDataService.create({
        ...req.body,
        userId: req.user.id,
      });
      res.json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const data = await InterviewDataService.getAll();
      const filtereddatas = data.filter((data) => data.userId === req.user.id);
      res.json(filtereddatas);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getOne(req, res) {
    try {
      const data = await InterviewDataService.getOne(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const updatedData = await InterviewDataService.update(req.body);
      res.json(updatedData);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const data = await InterviewDataService.delete(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new InterviewDataController();
