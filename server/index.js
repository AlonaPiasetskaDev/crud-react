const express = require("express");
const uuid = require("uuid");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const db = require("./lib/db");
const Settings = require("./conf").Settings;
const router = require("./router");

const APP = express();

APP.use(bodyParser.json());

APP.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const SessionStore = require("connect-pg-simple")(expressSession);

APP.use(
  expressSession({
    genid: (req) => {
      return uuid.v4(); // use UUIDs for session IDs
    },
    store: new SessionStore({
      tableName: "session",
      pool: db.pool,
      conObject: Settings.db,
    }),
    name: "SID",
    secret: "verySecret",
    resave: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    saveUninitialized: true,
  })
);

APP.use("/", router);
console.log(Settings);
APP.listen(Settings.port, () => {
  console.log(`App running on port ${Settings.port}.`);
});
