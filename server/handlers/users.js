const db = require("../lib/db");
const format = require("pg-format");

const pool = db.pool;

const listUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      console.error(error.stack);
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.error(error.stack);
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const newUser = request.body;

  const queryString = format(
    `INSERT INTO users(%I) VALUES (%L) RETURNING *`,
    Object.keys(newUser),
    Object.values(newUser)
  );
  pool.query(queryString,
    (error, result) => {
      if (error) {
        console.error(error.stack);
        response.status(400).json({ error: error.detail });
        return;
      }
      response.status(201).json(result.rows[0]);
    }
  );
};

const updateUser = async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    const updatedUser = await db.update('users', id, request.body)
    response.status(201).json(updatedUser)
  }  catch (err) {
    console.log(err)
    response.status(400).send(err.detail)
    
  }
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.error(error.stack);
      return;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
