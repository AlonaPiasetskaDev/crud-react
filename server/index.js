const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const users = require("./models/users");
const profiles = require("./models/profile");

const port = 3000;

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", users.listUsers);
app.get("/users/:id", users.getUserById);
app.post("/users", users.createUser);
app.put("/users/:id", users.updateUser);
app.delete("/users/:id", users.deleteUser);

app.get("/users/:userId/profiles", profiles.listProfiles);
app.post("/users/:userId/profiles", profiles.createProfile);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
