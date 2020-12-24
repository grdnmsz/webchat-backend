"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./users");
const socketRun = (io) => {
    io.on("connection", (socket) => {
        console.log("socketio is runing");
        socket.on("join", ({ name, room }, callback) => {
            const newUser = { id: socket.id, name, room };
            const { error, user } = users_1.addUser(newUser);
            if (error && !user) {
                return callback(error);
            }
            if (user) {
                socket.join(user.room);
                // the user is notified he joined the room
                socket.emit("message", {
                    text: `${user.name} welcome to ${user.room}`,
                });
                socket.broadcast.to(user.room).emit("message", {
                    text: `${user.name} is in da place!`,
                });
                callback();
            }
        });
        // someone sends a message
        socket.on("userMessage", (message, callback) => {
            const user = users_1.getUser(socket.id);
            io.to(user.room).emit("message", { user: user.name, text: message });
            callback();
        });
        socket.on("disconnect", () => {
            const user = users_1.removeUser(socket.id);
            if (user) {
                io.to(user.room).emit("message", {
                    text: `user ${user.name} has left the room`,
                });
            }
        });
    });
};
module.exports = {
    socketRun,
};
