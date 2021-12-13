const { request } = require("express");
const { pool } = require("../lib/db");
const { User, Profile } = require("../models");

const listUsers = async (request, response) => {
  const authUser = request.user;
  let users;
  if (authUser.isAdmin) {
    users = await User.findAll({ include: Profile });
  } else {
    users = await User.findAll({
      where: { id: authUser.id },
      include: Profile,
    });
  }

  if (users.length > 0) response.status(200).json(users);
};

const deleteUser = async (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("DELETE FROM users WHERE id = $1", [id], (error, result) => {
    if (error) {
      console.error(error.stack);
      return;
    }

    response.status(200).send(`User deleted with ID ${id}`);
  });
};

module.exports = {
  listUsers,
  deleteUser,
};
