import express from "express";
import cors from "cors";
import categoriesRouter from "./routes/categories.router.js"
import gamesRouter from "./routes/games.router.js"
const app = express();
app.use(cors());
app.use(express.json());
app.use(categoriesRouter);
app.use(gamesRouter);
app.listen(4000,console.log('RODANDO NA PORTA 4000'));