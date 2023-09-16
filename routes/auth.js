import express from "express";
import {
  hashPassword,
  verifyPassword,
  errorHandler,
  dataHandler,
} from "../utils.js";
import Users from "../models/Users.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return errorHandler(res, 400, {
        message: "You must provide a username and a password to login.",
      });
    }

    const users = await Users.find({ username });
    if (users.length === 0) {
      const user = await Users.create({
        username,
        password: hashPassword(password),
      });
      return dataHandler(res, 200, { username: user.username });
    } else {
      const user = users[0];

      const result = verifyPassword(password, user.password);
      if (!result) {
        return errorHandler(res, 403, {
          message: "Wrong username or password!",
        });
      }
      return dataHandler(res, 201, { username: user.username });
    }
  } catch (err) {
    errorHandler(res, 500, { message: err.message });
  }
});

export default router;
