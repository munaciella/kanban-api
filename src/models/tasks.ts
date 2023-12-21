import { ObjectId } from "mongodb";

export default class Tasks {
  constructor(public title: string, public body: string, public list: string, public id?: ObjectId) {}
}
