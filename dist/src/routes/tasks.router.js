"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
exports.taskRouter = express_1.default.Router();
exports.taskRouter.use(express_1.default.json());
exports.taskRouter.get("/", async (_req, res) => {
    try {
        const tasks = (await database_service_1.collections.tasks?.find({}).toArray());
        const typedTasks = tasks;
        res.status(200).send(typedTasks);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.taskRouter.post("/", async (req, res) => {
    try {
        const newTask = { ...req.body, list: "toDo" };
        const result = await database_service_1.collections.tasks?.insertOne(newTask);
        result
            ? res
                .status(201)
                .send(`Successfully added a new task with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new task.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
exports.taskRouter.patch("/:id", async (req, res) => {
    const id = req?.params?.id;
    try {
        const updatedTask = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = await database_service_1.collections.tasks?.updateOne(query, {
            $set: updatedTask,
        });
        result
            ? res
                .status(200)
                .send(`Successfully changed task with id ${id} to list ${req.body.list}`)
            : res.status(304).send(`Task with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
exports.taskRouter.delete("/:id", async (req, res) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = await database_service_1.collections.tasks?.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed task with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove task with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Task with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
//# sourceMappingURL=tasks.router.js.map