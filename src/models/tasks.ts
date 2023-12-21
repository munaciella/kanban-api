import { ObjectId } from "mongodb";

export default class Tasks {
  constructor(
    public title: string,
    public body: string,
    public list: "toDo" | "doing" | "done",
    public id?: ObjectId
  ) {}
}
