import { Socket } from "socket.io";
import { User } from "./common/types";

import { addUser, getUser, getUsersRoom, removeUser } from "./users";

const socketRun = (io: Socket) => {
  io.on("connection", (socket: Socket) => {
    console.log("socketio is runing");

    socket.on(
      "join",
      ({ name, room }: { name: string; room: string }, callback: any) => {
        const newUser: User = { id: socket.id, name, room };
        const { error, user } = addUser(newUser);

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
            /* 
              people (except the user) in the room are notified about a new user
              different than io.to(user.room).emit(â€¦);
            */
          });

          callback();
        }
      }
    );

    // someone sends a message
    socket.on("userMessage", (message: string, callback: any) => {
      const user = getUser(socket.id)!;
      io.to(user.room).emit("message", { user: user.name, text: message });
      callback();
    });

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
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
