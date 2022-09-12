const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const server = express();
server.use(bodyParser.json());

const getUsers = () => {
  const data = fs.readFileSync("users.json", "utf-8");
  console.log("data", data);
  return JSON.parse(data).users;
};

const updateUsers = (updatedUsers) => {
  fs.writeFileSync("users.json", JSON.stringify({ users: updatedUsers }));
};

server.get("/", (request, response) => {
  response.send("Hello!");
});

server.get("/users", (request, response) => {
  const users = getUsers();
  console.log("users", users);
  response.json(users);
});

server.post("/users", (request, response) => {
  const users = getUsers();
  console.log("body", request.body);
  const newUser = { ...request.body, id: users.length + 1 };
  const updatedUsers = [...users, newUser];
  updateUsers(updatedUsers);
  response.json(newUser);
});

server.put("/users", (request, response) => {
  const users = getUsers();
  const updatedUser = { ...request.body };
  const updatedUsers = users.map((user) => {
    if (user.id === updatedUser.id) {
      return updatedUser;
    }
    return user;
  });
  updateUsers(updatedUsers);
  response.json({ message: "user updated" });
});

server.delete("/users", (request, response) => {
  const users = getUsers();
  const updatedUsers = users.filter((user) => user.id !== request.body.id);
  updateUsers(updatedUsers);
  response.json({ message: "User deleted" });
});

server.listen(5001, () => console.log("server running on port 5001"));
