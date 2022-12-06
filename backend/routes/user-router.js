const express = require('express');
const router = express.Router();

const UserController = require("../controllers/user-controller");

/* Rotas */
router.get("/users/:email",  UserController.findByEmail);
router.get('/login', UserController.signIn);
router.post("/register", UserController.save);
router.put("/users/:email", UserController.update);
router.delete("/users/:email", UserController.delete);

module.exports = router;