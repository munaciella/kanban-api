import express from "express";
import cors from "cors";
import { connectToDatabase } from "./services/database.service";
import { taskRouter } from "./routes/tasks.router";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

connectToDatabase()
  .then(() => {
    app.use("/tasks", taskRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
