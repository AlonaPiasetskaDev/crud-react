const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const Settings = require("./conf");
const router = require("./router");

const APP = express();

APP.use(cors({ origin: "*" }));
APP.use(bodyParser.json());

APP.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

APP.use("/", router);

const start = async () => {
  try {
    await db.authenticate();
    await db.sync();
    APP.listen(Settings.port, () => {
      console.log(`App running on port ${Settings.port}.`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
