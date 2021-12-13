const db = require("../lib/db");

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

const createProfile = async (request, response) => {
  const userId = parseInt(request.params.userId);
  const newProfile = { user_id: userId, ...request.body };

  try {
    const savedProfile = await db.create('profiles', newProfile)
    response.status(201).json(savedProfile)
  }  catch (err) {
    console.log(err)
    response.status(400).send(err.detail)
    
  }
};

const getById = async (request, response) => {
  const id = parseInt(request.params.id);
  const userId = parseInt(request.params.userId);
  try {
    const userProfile = await db.get('profiles', {user_id: userId, id: id})
    response.status(200).json(userProfile[0])
  } catch (error) {
    response.status(400).json(error.detail)
  }
};

module.exports = {
  listProfiles,
  createProfile,
  getById
};
