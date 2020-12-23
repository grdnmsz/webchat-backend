/*
  handlers for in-room users
*/

import { User } from "./common/types";

const users: User[] = [];

export const addUser = ({ id, name, room }: User) => {
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => {
    user.name == name && user.room == room;
  });

  if (existingUser) {
    return { error: "user already exists" };
  } else {
    const newUser: User = { id, name, room };
    users.push(newUser);
    return { user: newUser };
  }
};

export const removeUser = (idToDelete: string) => {
  const idFound = users.findIndex(({ id, name, room }) => id === idToDelete);
  if (idFound !== -1) {
    return users.splice(idFound, 1)[0]; // deleted user
  }
};

export const getUser = (idToFind: string) => {
  return users.find(({ id, name, room }) => id === idToFind);
};

export const getUsersRoom = (roomToFind: string) => {
  users.filter(({ id, name, room }) => {
    room == roomToFind;
  });
};
