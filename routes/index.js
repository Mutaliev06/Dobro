const { Router } = require("express");
const router = Router();

router.use('/api/users', require("./users.route"));

router.use('/api/comments', require("./comments.route"));

router.use('/api/categories',require("./categories.route"));

router.use('/api/notes', require("./notes.route"));

router.use(require('./upload.route'));

router.all(/\w/, (req, res) => {
  res.status(404).send("Ошибка 404: Страница не существует");
});


module.exports = router;