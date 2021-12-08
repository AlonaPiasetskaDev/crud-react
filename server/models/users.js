const db = require("./db");
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
  const { password, email } = request.body;
  pool.query(
    "INSERT INTO users (password, email) VALUES ($1, $2) RETURNING *",
    [password, email],
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

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { password, email, isAdmin } = request.body;
  pool.query(
    "UPDATE users SET password = $1, email = $2, isAdmin = $3 WHERE id = $4 RETURNING *",
    [password, email, isAdmin, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
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
