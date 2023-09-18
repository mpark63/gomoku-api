import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  try {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  } catch (err) {
    throw err;
  }
};

export const verifyPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

export const errorHandler = (res, status, err) => {
  res.status(status).json({ status: status, message: err.message });
};

export const dataHandler = (res, status, data) => {
  res.status(status).json({ status: status, data: data });
};

export const checkGameOver = (board, newX, newY) => {
  const startX = newX - 4 < 0 ? 0 : newX - 4;
  const startY = newY - 4 < 0 ? 0 : newY - 4;
  const endX = newX + 4 > 18 ? 18 : newX + 4;
  const endY = newY + 4 > 18 ? 18 : newY + 4;

  // horizantal check
  let y = newY;
  let count = 0;
  let color = "";
  for (let x = startX; x <= endX; x++) {
    if (board[x][y] === "") {
      count = 0;
      color = "";
    } else if (color === board[x][y]) {
      count++;
    } else {
      count = 1;
      color = board[x][y];
    }
    if (count >= 5) {
      return true;
    }
  }
  console.log("horizantal check complete");

  // vertical check
  let x = newX;
  count = 0;
  color = "";
  for (let y = startY; y <= endY; y++) {
    if (board[x][y] === "") {
      count = 0;
      color = "";
    } else if (color === board[x][y]) {
      count++;
    } else {
      count = 1;
      color = board[x][y];
    }
    if (count >= 5) {
      return true;
    }
  }
  console.log("vertical check complete");

  // diagonal check
  y = startY;
  x = startX;
  count = 0;
  color = "";
  while (y <= endY && x <= endX) {
    if (board[x][y] === "") {
      count = 0;
      color = "";
    } else if (color === board[x][y]) {
      count++;
    } else {
      count = 1;
      color = board[x][y];
    }
    x++;
    y++;
    if (count >= 5) {
      return true;
    }
  }
  console.log("diagonal check 1 complete");

  // diagonal check
  y = endY;
  x = startX;
  count = 0;
  while (y >= startX && x <= endX) {
    if (board[x][y] === "") {
      count = 0;
      color = "";
    } else if (color === board[x][y]) {
      count++;
    } else {
      count = 1;
      color = board[x][y];
    }
    x++;
    y--;
    if (count >= 5) {
      return true;
    }
  }
  console.log("diagonal check 2 complete");

  return false;
};
