const Category = require("../models/Category.model");

module.exports.categoryControllers = {
  getAllCategory: async (req, res) => {
    const category = await Category.find();
    return res.json(category);
  },

  createCategory: async (req, res) => {
    try {
      const { title } = req.body;
      const category = await Category.create({ title });

      res.status(200).json(category);
    } catch (e) {
      res.status(400).json("не  удалось добавить категорию");
    }
  },
};
