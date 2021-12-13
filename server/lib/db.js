const { Pool } = require("pg");
const format = require("pg-format");
const Settings = require("../conf");

// Loading and initializing the library:
const pgp = require("pg-promise")({
  // Initialization Options
});

// Preparing the connection details:
const CONNECTION = `postgres://${Settings.db.user}:${Settings.db.password}@${Settings.db.host}:${Settings.db.port}/${Settings.db.database}`;

// Creating a new database instance from the connection details:
const pgpDB = pgp(CONNECTION);
pgpDB.connect();

const pool = new Pool({
  user: Settings.db.user,
  host: Settings.db.password,
  database: Settings.db.database,
  password: Settings.db.host,
  port: Settings.db.port,
});

const create = async (table, newObject) => {
  const queryString = format(
    `INSERT INTO ${table}(%I) VALUES (%L) RETURNING *`,
    Object.keys(newObject),
    Object.values(newObject)
  );
  try {
    const res = await pool.query(queryString);
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const get = async (table, params) => {
  const queryParams = Object.entries(params)
    .map((p, i) => {
      return `${p[0]} = $${i + 1}`;
    })
    .join(" AND ");
  const where = pgp.as.format(
    `WHERE ${queryParams}`,
    Object.values(params).map((v) => String(v))
  );
  try {
    const users = await pgpDB.any(`SELECT * FROM ${table} $1:raw`, where);
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const update = async (table, objId, updateFields) => {
  const data = { id: objId, ...updateFields };
  const condition = pgp.as.format("WHERE id = ${id} RETURNING *", data);
  try {
    const updateQuery =
      pgp.helpers.update(data, Object.keys(updateFields), table) + condition;
    const res = await pool.query(updateQuery);
    return res.rows[0];
  } catch (err) {
    console.error(err.stack);
    throw err;
  }
};

module.exports = {
  pool,
  update,
  create,
  get,
};
