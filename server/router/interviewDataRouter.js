import Router from "express";

import InterviewDataController from "../controllers/InterviewDataController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const interviewDataRouter = new Router();

interviewDataRouter.post("/", authMiddleware, InterviewDataController.create);
interviewDataRouter.get("/", authMiddleware, InterviewDataController.getAll);
interviewDataRouter.get("/:id", authMiddleware, InterviewDataController.getOne);
interviewDataRouter.put("/", authMiddleware, InterviewDataController.update);
interviewDataRouter.delete(
  "/:id",
  authMiddleware,
  InterviewDataController.delete
);

export default interviewDataRouter;
