"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.collections = void 0;
const mongoDB = __importStar(require("mongodb"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.collections = {};
async function connectToDatabase() {
    try {
        const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const tasksCollection = db.collection(process.env.TASKS_COLLECTION_NAME);
        exports.collections.tasks = tasksCollection;
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${tasksCollection.collectionName}`);
    }
    catch (err) {
        console.log("error:", err);
    }
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=database.service.js.map