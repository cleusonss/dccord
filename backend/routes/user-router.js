const express = require('express');
const router = express.Router();

const UserController = require("../controllers/user-controller");

/* Rotas */
router.get("/users/:email",  UserController.findByEmail);
router.put("/users/:email", UserController.update);
router.delete("/users/:email", UserController.delete);

router.post("/signin", UserController.signIn);
router.post("/signup", UserController.save);

module.exports = router;