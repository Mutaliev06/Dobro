const { Router } = require('express');
const User = require('../models/User.model');

const router = Router();

const path = require('path');

router.post('/upload/:id', (req, res) => {

  const image  = req.files.image;
  const fileName = `./image/${Math.random() * 10000}${path.extname(image.name)}`;

  image.mv(fileName, async (err) => {

    if (err) {
      console.log(err);
    } else {
      const user = await User.findById(req.params.id);

      user.pathToAvatar = fileName;
      await user.save();
      res.json('Файл загружен');
    }
  });
});

module.exports = router;
