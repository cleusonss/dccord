require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const User = require("./model/user");
const UserController = require("./controller/user-controller");


const Auth = require("./middleware/auth");

/* Middlewares */
app.use(cors());
app.use(express.json());


/* Rotas */
app.post("/register", UserController.save);
app.post("/user/:email", Auth.mandatory, UserController.update);
app.get("/user/:email", Auth.optional, UserController.findByEmail);
app.post('/login', Auth.optional, UserController.signIn);

module.exports = app;
