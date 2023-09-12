import mongoose from "mongoose";

const initialPositions = [];

// initialize positions
for (let i = 0; i < 19; i++) {
  initialPositions[i] = [];
  for (let j = 0; j < 19; j++) {
    initialPositions[i][j] = "";
  }
}

const GameSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  whiteUsername: { type: String, required: true },
  blackUsername: { type: String, required: true },
  currentTurn: { type: String, default: "black" },
  positions: { type: Array, default: initialPositions },
  gameOver: { type: Boolean, default: false },
});

const Games = mongoose.model("Game", GameSchema);

export default Games;
