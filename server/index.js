const express = require("express");
// const uuid = require("uuid");
var cors = require("cors");
//
// const expressSession = require("express-session");

const bodyParser = require("body-parser");
const db = require("./db");
const Settings = require("./conf");
const router = require("./router");

// const SessionStore = require('express-session-sequelize')(expressSession.Store);

const APP = express();

// const sequelizeSessionStore = new SessionStore({
//     db: db,
//     table : 'session'
// });

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
