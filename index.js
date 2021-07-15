require('dotenv').config()
const morgan = require("morgan");
const upload = require('express-fileupload');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const router = require("./routes/index");



const app = express();

app.use(cors());
app.use(upload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/image", express.static(path.resolve(__dirname, "image")))
app.use(router);


async function start() {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.PORT, () => {
      console.log("Сервер и БД запущены...");
    });
  } catch (e) {
    console.log(e.message);
  }
}

start();