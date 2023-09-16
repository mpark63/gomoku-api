import app from "./index.js";
import * as db from "./db.js";
import { createServer } from "http";
import { Server } from "socket.io";

db.connect(process.env.DATABASE_URL);
const PORT = process.env.PORT || 4567;

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:9000", "https://gomokumoku.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// listening to events
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("join game", (username, gamecode) => {
    console.log(`${username} joined ${gamecode}`);
    socket.join(gamecode);
    socket.to(gamecode).emit("new player", username);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Gomoku API at http://localhost:${PORT}/`);
});
