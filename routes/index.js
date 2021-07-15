const { Router } = require("express");
const router = Router();

router.use('/users', require("./users.route"));

router.use('/comments', require("./comments.route"));

router.use('/categories',require("./categories.route"));

router.use('/notes', require("./notes.route"));

router.use(require('./upload.route'));

// router.all(/\w/, (req, res) => {
//   res.status(404).send("Ошибка 404: Страница не существует");
// });


module.exports = router;