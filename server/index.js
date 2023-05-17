import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { DB_URL } from "./config.js";
import authRouter from "./router/authRouter.js";
import interviewDataRouter from "./router/interviewDataRouter.js";
import tasksRouter from "./router/tasksRouter.js";

const PORT = 5000;

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/interviewData", interviewDataRouter);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log("server started on PORT " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();
