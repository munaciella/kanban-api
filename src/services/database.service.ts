import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();
export const collections: { tasks?: mongoDB.Collection } = {};


export async function connectToDatabase() {
  try {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
      process.env.DB_CONN_STRING!
    );

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const tasksCollection: mongoDB.Collection = db.collection(
      process.env.TASKS_COLLECTION_NAME!
    );

    collections.tasks = tasksCollection;

    console.log(
      `Successfully connected to database: ${db.databaseName} and collection: ${tasksCollection.collectionName}`
    );
  } catch (err) {
    console.log("error:", err);
  }
}
