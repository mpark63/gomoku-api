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
