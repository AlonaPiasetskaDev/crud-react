const { User } = require("../models");

const getAccount = async (request, response) => {
  const userId = parseInt(request.session.userId);
  try {
    const user = await User.findOne({ where: { id: userId } });

    return response.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAccount,
};
