const db = require("./db");
const format = require("pg-format");

const pool = db.pool;

const listProfiles = (request, response) => {
  const userId = parseInt(request.params.userId);
  pool.query(
    "SELECT * FROM profiles WHERE user_id = $1 ORDER BY id ASC",
    [userId],
    (error, result) => {
      if (error) {
        console.error(error);
        return response.status(500).json(error.detail);
      }
      console.log(result);
      response.status(200).json(result.rows);
    }
  );
};

const createProfile = (request, response) => {
  const userId = parseInt(request.params.userId);
  const newProfile = { user_id: userId, ...request.body };

  const queryString = format(
    `INSERT INTO profiles(%I) VALUES (%L) RETURNING *`,
    Object.keys(newProfile),
    Object.values(newProfile)
  );
  pool.query(queryString, (error, result) => {
    if (error) {
      console.log(error);
      response.status(400).json({ error: error.detail });
      return;
    }
    response.status(201).json(result.rows[0]);
  });
};

module.exports = {
  listProfiles,
  createProfile,
  // getUserById,
  // createUser,
  // updateUser,
  // deleteUser,
};
