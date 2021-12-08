const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "default",
  password: "enxx5z42",
  port: 5432
});

const pgClient = new Client({
  user: "postgres",
  host: "localhost",
  database: "default",
  password: "enxx5z42",
  port: 5432
})

const create = async (table, newObject, response) => {
  const values = Object.values(newObject).join(",");
  const keys = Object.keys(newObject).join(",");

  console.log(keys);
  const queryString = `INSERT INTO ${table} (${keys}) VALUES (${values}) RETURNING *`;
  console.log(queryString);
  try {
    const res = await pool.query(queryString);
    console.log(res);
    return response.status(200).json(res.rows);
  } catch (err) {
    console.error(err.stack);
    return response.status(400).json(err);
  }
};

const update = async (table, updateObject, response) => {
  const objId = updateObject.id;

  const args = Object.values(updateObject);
  const keys = Object.keys(updateObject).join(",");
  const argKeys = Object.keys(updateObject)
    .map((obj, index) => {
      return "$" + (index + 1);
    })
    .join(",");

  const queryString = `UPDATE ${table} SET ${keys} = ${argKeys} WHERE id = ${objId} RETURNING *`;

  try {
    const res = await pool.query(queryString, args);
    return response.status(200).json(res.rows);
  } catch (err) {
    console.error(err.stack);
    return response.status(400).json(err);
  }
};

module.exports = {
  pool,
  pgClient,
  update,
  create,
};
