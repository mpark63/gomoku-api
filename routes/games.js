import express from "express";
import Games from "../models/Games.js";
import { dataHandler, errorHandler } from "../utils.js";
const router = express.Router();

/* Create new game. */
router.post("/games/new", async function (req, res) {
  const { whiteUsername, blackUsername } = req.body;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  try {
    const game = await Games.create({ code, whiteUsername, blackUsername });
    return dataHandler(res, 201, game);
  } catch (err) {
    return errorHandler(res, 500, { message: err.message });
  }
});

router.get("/games/:code", async function (req, res) {
  const { code } = req.params;
  const { username } = req.body;
  const game = await Games.findOne({ code });
  if (game === null) {
    return errorHandler(res, 404, { message: "Game not found!" });
  } else {
    if (game.whiteUsername !== username && game.blackUsername !== username) {
      return errorHandler(res, 403, {
        message: "You are not a player in this game!",
      });
    } else if (game.gameOver) {
      return errorHandler(res, 400, { message: "Game is over!" });
    } else {
      return dataHandler(res, 200, game);
    }
  }
});

router.patch("/games/move", async function (req, res) {
  const { code, username, x, y } = req.body;
  const game = await Games.findOne({ code });
  
  if (game === null) {
    return errorHandler(res, 404, { message: "Game not found!" });
  } else {
    if (game.gameOver) {
      return errorHandler(res, 400, { message: "Game is over!" });
    } else if (
      (game.blackUsername !== username && game.currentTurn !== "black") ||
      (game.whiteUsername !== username && game.currentTurn !== "white")
    ) {
      return errorHandler(res, 400, {
        message: "It is not your turn to play the game!",
      });
    } else if (game.positions[x][y] !== "") {
      return errorHandler(res, 400, { message: "Illegal move!" });
    } else {
      game.positions[x][y] = game.currentTurn;
      await game.save();
      return dataHandler(res, 200, game);
    }
  }
});

export default router;
