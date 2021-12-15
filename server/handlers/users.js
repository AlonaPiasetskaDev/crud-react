const { Profile, User } = require("../models");

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
  if (users.length > 0) {
    console.log(users);
    response.headers = { "Content-Type": "application/json" };
    response.status(200).json(users);
  }
};

module.exports = {
  listUsers
};
