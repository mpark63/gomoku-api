import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import games from "./routes/games.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(auth);
app.use(games);

app.get("/", (req, res) => {
  res.send("Welcome to the Gomoku API!");
});

export default app;
