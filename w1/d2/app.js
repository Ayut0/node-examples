const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  console.log("request received");
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) throw err;
    if (request.method === "GET") {
      response.setHeader("content-type", "application/json");
      response.write(data);
      response.end();
    } else {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk;
      });
      request.on("end", () => {
        console.log(JSON.parse(body));
        const jsonBody = JSON.parse(body);
        const jsonData = JSON.parse(data);
        if (request.method === "POST") {
          const newUser = { id: jsonData.users.length + 1, ...jsonBody };
          const updatedUsers = [...jsonData.users, newUser];
          fs.writeFile(
            "users.json",
            JSON.stringify({ users: updatedUsers }),
            (err) => {
              response.setHeader("content-type", "application/json");
              response.write(JSON.stringify(newUser));
              response.end();
            }
          );
        }
        if (request.method === "PUT") {
          let updatedUser = {};
          const updatedUsers = jsonData.users.map((user) => {
            if (user.id === jsonBody.id) {
              updatedUser = {
                ...user,
                name: jsonBody.name,
                country: jsonBody.country,
              };
              return updatedUser;
            }
            return user;
          });
          fs.writeFile(
            "users.json",
            JSON.stringify({ users: updatedUsers }),
            (err) => {
              if (err) throw err;
              response.setHeader("content-type", "application/json");
              response.write(JSON.stringify(updatedUser));
              response.end();
            }
          );
        }
        if (request.method === "DELETE") {
          const updatedUsers = jsonData.users.filter(
            (user) => user.id !== jsonBody.id
          );
          fs.writeFile(
            "users.json",
            JSON.stringify({ users: updatedUsers }),
            (err) => {
              if (err) throw err;
              response.setHeader("content-type", "application/json");
              response.write(JSON.stringify({ message: "User deleted" }));
              response.end();
            }
          );
        }
      });
    }
  });
});

server.listen(3001, () => console.log("server running on port 3001"));
