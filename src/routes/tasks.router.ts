import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Tasks from "../models/tasks";

export const taskRouter = express.Router();

taskRouter.use(express.json());

taskRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const tasks = (await collections.tasks?.find({}).toArray()) as unknown;
    const typedTasks: Tasks[] = tasks as Tasks[];

    res.status(200).send(typedTasks);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

taskRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newTask = { ...req.body, list: "toDo" } as Tasks;
    const result = await collections.tasks?.insertOne(newTask);

    result
      ? res
          .status(201)
          .send(`Successfully added a new task with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new task.");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

taskRouter.patch("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedTask: { list: string } = req.body;
    const query = { _id: new ObjectId(id) };

    const result = await collections.tasks?.updateOne(query, {
      $set: updatedTask,
    });

    result
      ? res
          .status(200)
          .send(
            `Successfully changed task with id ${id} to list ${req.body.list}`
          )
      : res.status(304).send(`Task with id: ${id} not updated`);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

taskRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.tasks?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed task with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove task with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Task with id ${id} does not exist`);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
