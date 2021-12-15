const Settings = {
  port: 4000,
  db: {
    user: "postgres",
    host: "localhost",
    database: "logindb",
    password: "enxx5z42",
    port: 5432,
  },
  session: {
    name: "SID",
    secret: "verySecret",
    resave: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    saveUninitialized: true,
  },
  jwt: {
    secret: "jwtSecret"
  }
};

module.exports = Settings;
