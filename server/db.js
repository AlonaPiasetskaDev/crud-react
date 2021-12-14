const { Sequelize } = require("sequelize");
const Settings = require("./conf");

const db = new Sequelize(
  Settings.db.database,
  Settings.db.user,
  Settings.db.password,
  {
    dialect: "postgres",
    host: Settings.db.host,
    port: Settings.db.port,
  }
);

module.exports = db;
