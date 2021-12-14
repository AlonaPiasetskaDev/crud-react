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
  const authUser = request.user;
  let profile;
  try {
    if (authUser.isAdmin) {
      profile = await Profile.create({ userId: authUser.id, ...request.body });
    } else if (!authUser.isAdmin && authUser.id === userId) {
      profile = await Profile.create({ userId: authUser.id, ...request.body });
    } else {
      response.status(403).json("Unauthorized");
    }
    response.status(201).json(profile);
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: error.message });
  }
};

const updateProfile = async (request, response) => {
  const userId = parseInt(request.params.userId);
  const profileId = parseInt(request.params.profileId);

  const authUser = request.user;
  let profile;

  try {
    if (authUser.isAdmin) {
      const p = await Profile.findByPk(profileId);
      profile = await p.update(request.body);
    } else if (!authUser.isAdmin && authUser.id === userId) {
      profile = await Profile.update(
        { userId: authUser.id, ...request.body },
        { where: { id: profileId, userId: userId } }
      );
    } else {
      response.status(403).json("Unauthorized");
    }
    response.status(200).json(profile);
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: error.message });
  }
};

const deleteProfile = async (request, response) => {
  const userId = parseInt(request.params.userId);
  const profileId = parseInt(request.params.profileId);

  const authUser = request.user;

  try {
    if (authUser.isAdmin) {
      await Profile.destroy({ where: { id: profileId } });
    } else if (!authUser.isAdmin && authUser.id === userId) {
      await Profile.destroy({ where: { id: profileId, userId: authUser.id } });
    } else {
      response.status(403).json("Unauthorized");
    }
    response.status(200).send();
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  listProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
};
