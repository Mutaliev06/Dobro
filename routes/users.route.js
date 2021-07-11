const { usersController } = require("../controllers/users.controller");
const { Router } = require("express");

const router = Router();

router.get("/users", usersController.getUsers);
router.post('/users', usersController.registerUser)
router.post('/login', usersController.login)

module.exports = router;