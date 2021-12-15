const getStats = async (request, response) => {
  // const authUser = request.user;

  try {
    // это может делать только админ. админа можно достать с рекветса
    // достать количество профелей и юзеров https://sequelize.org/v5/manual/models-usage.html#-code-count--code----count-the-occurrences-of-elements-in-the-database
    // вернуть респонс статус 200 с джсоном типо {'users' 5, 'profiles': 10}
    // если не админ вернуть респонс со статусом 403 
    response.status(200).json({"users": 5, "profiles": 10})
  } catch (error) {
    // если не админ вернуть месседж ошибки в джсоне со статус кодом 500
  }
};

module.exports={
  getStats
}
