const { Router } = require("express");
const router = Router();

router.use('/users', require("./users.route"));

router.use('/comments', require("./comments.route"));

router.use('/categories',require("./categories.route"));

router.use('/notes', require("./notes.route"));

router.use(require('./upload.route'));



module.exports = router;