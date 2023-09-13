import express from "express";
import Games from "../models/Games.js";
import { dataHandler, errorHandler, checkGameOver } from "../utils.js";
const router = express.Router();

/* Create new game. */
router.post("/games", async function (req, res) {
  const { blackUsername } = req.body;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  try {
    const game = await Games.create({ code, blackUsername });
    return dataHandler(res, 201, game);
  } catch (err) {
    return errorHandler(res, 500, { message: err.message });
  }
});

router.get("/games/:code", async function (req, res) {
  const { code } = req.params;
  const { username } = req.query;
  const game = await Games.findOne({ code });

  // 403
  if (!username) {
    return errorHandler(res, 403, {
      message: "You are not a player in this game!",
    });
  }

  // new player join game
  if (game.blackUsername != username && game.whiteUsername === "") {
    game.whiteUsername = username;
    await game.save();
  }

  if (game === null) {
    errorHandler(res, 404, { message: "Game not found!" });
  } else {
    if (game.whiteUsername !== username && game.blackUsername !== username) {
      errorHandler(res, 403, {
        message: "You are not a player in this game!",
      });
    } else if (game.gameOver) {
      errorHandler(res, 400, { message: "Game is over!" });
    } else {
      dataHandler(res, 200, game);
    }
  }
});

router.patch("/games/:code", async function (req, res) {
  const { code } = req.params;
  const { username, x, y } = req.body;
  const game = await Games.findOne({ code });

  if (game === null) {
    return errorHandler(res, 404, { message: "Game not found!" });
  }

  if (game.gameOver) {
    errorHandler(res, 400, { message: "Game is over!" });
  } else if (
    (game.blackUsername === username && game.currentTurn !== "black") ||
    (game.whiteUsername === username && game.currentTurn !== "white")
  ) {
    errorHandler(res, 400, {
      message: "It is not your turn to play the game!",
    });
  } else if (
    x < 0 ||
    y < 0 ||
    x > 18 ||
    y > 18 ||
    game.positions[x][y] !== ""
  ) {
    errorHandler(res, 400, { message: "Illegal move!" });
  } else {
    game.positions[x][y] = game.currentTurn;
    game.markModified("positions");
    game.currentTurn = game.currentTurn === "black" ? "white" : "black";
    game.gameOver = checkGameOver(game.positions, x, y);
    await game.save();
    dataHandler(res, 200, game);
  }
});

export default router;
