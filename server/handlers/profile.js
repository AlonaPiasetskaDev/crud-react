const { db } = require("../conf");
const { Profile } = require("../models");

const listProfiles = async (request, response) => {
  const userId = parseInt(request.params.userId);
  const authUser = request.user;

  let profiles;
  if (authUser.isAdmin) {
    profiles = await Profile.findAll({ where: { userId: userId } });
  } else if (!authUser.isAdmin && authUser.id === userId) {
    profiles = await Profile.findAll({ where: { userId: userId } });
  } else {
    response.status(403).json("Unauthorized");
  }

  response.status(200).json(profiles);
};

const createProfile = async (request, response) => {
  const userId = parseInt(request.params.userId);
  const newProfile = { user_id: userId, ...request.body };

  try {
    const savedProfile = await db.create("profiles", newProfile);
    response.status(201).json(savedProfile);
  } catch (err) {
    response.status(400).send(err.detail);
  }
};

const getById = async (request, response) => {
  const id = parseInt(request.params.id);
  const userId = parseInt(request.params.userId);

  try {
    const userProfile = await db.get("profiles", {user_id: userId, id: id});
    response.status(200).json(userProfile[0])
  } catch (err) {
    response.status(400). json(err.detail)
  }
};

module.exports = {
  listProfiles,
  createProfile,
  getById
}
