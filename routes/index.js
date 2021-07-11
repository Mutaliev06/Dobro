const { Router } = require("express");
const router = Router();

router.use(require("./users.route"));

router.use(require("./comments.route"));

router.use(require("./categories.route"));

router.use(require("./notes.route"));

router.use(require('./upload.route'));

module.exports = router;