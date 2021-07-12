const { usersController } = require("../controllers/users.controller");
const { Router } = require("express");

const router = Router();

router.get("/", usersController.getUsers);
router.post('/', usersController.registerUser)
router.post('/login', usersController.login)

module.exports = router;