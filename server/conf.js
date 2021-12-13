const Settings = {
  port: 3000,
  db: {
    user: "postgres",
    host: "localhost",
    database: "default",
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
};

module.exports = Settings;
