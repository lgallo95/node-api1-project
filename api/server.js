// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model.js");

// const User = require('./users/model')

const server = express();

server.use(express.json());

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
server.post("/api/users", async (req, res) => {
  const { id, name, bio } = req.body;
  console.log("req.body", id, name, bio);
  try {
    const insertUsers = await Users.insert({ id, name, bio });
    if (!insertUsers.name || !insertUsers.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      res.status(201).json(insertUsers);
    }
  } catch (err) {
    res
      .status(500)
      .json({
        message: "There was an error while saving the user to the database",
      });
  }
});

// | GET    | /api/users     | Returns an array users.                                                                                |

server.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved" });
  }
});

// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |

server.get("/api/users/:id", async (req, res) => {
  console.log(req.method);
  console.log(req.headers);
  console.log(req.body);
  console.log(req.params);

  try {
    const { id } = req.params;
    const users = await Users.findById(id);
    if (!users) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({ message: "The user could not be removed" });
  }
});

// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
server.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await Users.remove(req.params.id);
    if (!deletedUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
      } else {
        res.json(deletedUser)
      }
  } 
  catch (err) {
    res.status(500).json({ message: "The user could not be removed" })
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
