const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require("../models/User.model");



module.exports.usersController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      res.json(e.message);
    }
  },
  getUsersById: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.json(e.message);
    }
  },

  registerUser: async (req, res) => {
    try {
      const { login, password, name, email } = req.body;

      const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

      const user = await User.create({
        login: login,
        password: hash,
        name:  name,
        email:  email
      });
      res.json(user);
    } catch (e) {
      res.json(e.message);
    }
  },

  login: async (req, res) => {
    const { login, password } = req.body

    try {
      const candidate = await User.findOne({ login })

      if(!candidate) {
        return res.status(401).json({error: "Неверный логин"})
      }

      const valid = await bcrypt.compare(password, candidate.password)

      if (!valid) {
        return res.status(401).json({error:'Неверный пароль'})
      }

      const payload = {
        id: candidate._id,
        login: candidate.login
      }

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h"
      })

      res.json({token})
    }  catch (e) {
      res.json({error: e.message});
    }
  },

};

