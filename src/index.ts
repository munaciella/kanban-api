import express from 'express';
import * as mongoDB from 'mongodb'
import * as dotenv from 'dotenv'
// import mongoose from 'mongoose';

const collections: {kanban?: mongoDB.Collection<Kanban>} = {}

const app = express();
const port = 8000;

app.get('./', (req, res))
