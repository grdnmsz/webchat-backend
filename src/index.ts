import express from "express";
import http from "http";
// import cors from "cors";

const socketIo = require("socket.io");

const { routes } = require("./routes");
const { socketRun } = require("./socketChat");

const PORT = 5000;

const app = express();
const httpServer: http.Server = http.createServer(app);
const io = socketIo(httpServer, {
  origin: "https://localhost:3000",
  cors: true,
});

routes(app);
socketRun(io);

httpServer.listen(process.env.PORT || PORT, () => {
  console.log(`listening on ${PORT}`);
});
