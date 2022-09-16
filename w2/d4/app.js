const express = require("express");
const users = require("./models/users.json");
// const UserController = require('./controllers/UserController')
// const { showUsers } = require("./controllers/UserController");
const userRouter = require("./routes/users");

const app = express();
app.set("view engine", "ejs");
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.render("home");
});

// class Object
// methods = functions
//{
//    key:values
//}
// values = (obj) => [values]

// app.get("/users", );
// app.get("/users", UserController.showUsers);
// app.post("/users", UserController.createUsers);
// app.put("/users", UserController.editUsers);
// app.delete("/users", UserController.deleteUsers);

// app.get("/posts", UserController.showUsers);
// app.post("/posts", UserController.createUsers);
// app.put("/posts", UserController.editUsers);
// app.delete("/posts", UserController.deleteUsers);

// app.get("/comments", UserController.showUsers);
// app.post("/comments", UserController.createUsers);
// app.put("/comments", UserController.editUsers);
// app.delete("/comments", UserController.deleteUsers);

app.listen(3001, () => console.log("running 3001"));
