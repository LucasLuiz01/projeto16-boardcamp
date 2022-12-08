import express from "express";
import { connection } from "./database/db.js";
import cors from "cors";
import categoriesRouter from "./routes/categories.router.js"
const app = express();
app.use(cors());
app.use(express.json());
app.use(categoriesRouter);
app.listen(4000,console.log('RODANDO NA PORTA 4000'));