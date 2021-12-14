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

// const updateUser = async (request, response) => {
//   const id = parseInt(request.params.id);
//
//   try {
//     const updatedUser = await db.update('users', id, request.body)
//     response.status(201).json(updatedUser)
//   }  catch (err) {
//     console.log(err)
//     response.status(400).send(err.detail)
//
//   }
// };

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id);
//   pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       console.error(error.stack);
//       return;
//     }
//     response.status(200).send(`User deleted with ID: ${id}`);
//   });
// };

module.exports = {
  listUsers,
  // deleteUser,
};
