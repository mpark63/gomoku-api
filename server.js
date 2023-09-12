import app from "./index.js";
import * as db from "./db.js";

db.connect(process.env.DATABASE_URL);
const PORT = process.env.PORT || 4567;

app.listen(PORT, () => {
  console.log(`Gomoku API at http://localhost:${PORT}/`);
});