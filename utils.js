import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
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

  // vertical check
  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      if (board[x][y] !== "") {
        let count = 0;
        const color = board[x][y];
        while (y <= endY && board[x][y] === color) {
          y++;
          count++;
          if (count == 5) {
            return true;
          }
        }
      }
    }
  }

  // horizantal check
  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      if (board[x][y] !== "") {
        let count = 0;
        const color = board[x][y];
        while (x <= endX && board[x][y] === color) {
          x++;
          count++;
          if (count == 5) {
            return true;
          }
        }
      }
    }
  }

  // TODO: diagonal check
  // for (let y = startY; y <= endY; y++) {
  //   let currY = y;
  //   let currX = startX;
  //   let count = 0;
  //   // ----
  //   //    |
  //   while (currY <= endY && currX <= endX) {
  //     currY++;
  //     currX++;
  //     count++;
  //     if (count == 5) {
  //       return true;
  //     }
  //   }
  //   //    |
  //   // ____
  //   currY = y;
  //   currX = endX;
  //   count = 0;
  //   while (currY <= endY && currX >= startX) {
  //     currY++;
  //     currX--;
  //     count++;
  //     if (count == 5) {
  //       return true;
  //     }
  //   }
  // }

  // for (let x = startX; y <= endX; x++) {
  //   let currY = startY;
  //   let currX = x;
  //   let count = 0;
  //   while (currY <= endY && currX <= endX) {
  //     currY++;
  //     currX++;
  //     count++;
  //     if (count == 5) {
  //       return true;
  //     }
  //   }
  //   currY = startY;
  //   currX = x;
  //   count = 0;
  //   while (currY <= endY && currX >= startX) {
  //     currY++;
  //     currX--;
  //     count++;
  //     if (count == 5) {
  //       return true;
  //     }
  //   }
  // }

  return false;
};
