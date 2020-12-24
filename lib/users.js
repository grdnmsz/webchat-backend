"use strict";
/*
  handlers for in-room users
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersRoom = exports.getUser = exports.removeUser = exports.addUser = void 0;
const users = [];
const addUser = ({ id, name, room }) => {
    room = room.trim().toLowerCase();
    const existingUser = users.find((user) => {
        user.name == name && user.room == room;
    });
    if (existingUser) {
        return { error: "user already exists" };
    }
    else {
        const newUser = { id, name, room };
        users.push(newUser);
        return { user: newUser };
    }
};
exports.addUser = addUser;
const removeUser = (idToDelete) => {
    const idFound = users.findIndex(({ id, name, room }) => id === idToDelete);
    if (idFound !== -1) {
        return users.splice(idFound, 1)[0]; // deleted user
    }
};
exports.removeUser = removeUser;
const getUser = (idToFind) => {
    return users.find(({ id, name, room }) => id === idToFind);
};
exports.getUser = getUser;
const getUsersRoom = (roomToFind) => {
    users.filter(({ id, name, room }) => {
        room == roomToFind;
    });
};
exports.getUsersRoom = getUsersRoom;
