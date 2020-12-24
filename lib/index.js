"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
// import cors from "cors";
const socketIo = require("socket.io");
const { routes } = require("./routes");
const { socketRun } = require("./socketChat");
const PORT = 5000;
const app = express_1.default();
const httpServer = http_1.default.createServer(app);
const io = socketIo(httpServer, {
    origin: "https://localhost:3000",
    cors: true,
});
routes(app);
socketRun(io);
httpServer.listen(process.env.PORT || PORT, () => {
    console.log(`listening on ${PORT}`);
});
