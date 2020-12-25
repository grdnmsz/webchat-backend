import { addUser, getUser, getUsersRoom, removeUser } from "../src/users";
import { User } from "../src/common/types";

describe("users", () => {
  it("add one user", () => {
    let newUser: User = { id: "1", name: "Gordon", room: "chatroom" };
    let result = addUser(newUser);
    expect(result).toEqual({ user: newUser });
  });
});
