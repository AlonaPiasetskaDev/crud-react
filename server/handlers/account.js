const db = require("../lib/db");



const getAccount = async (request, response) => {
    const userId = parseInt(request.session.userId);
    try {
      const user = await db.get('users', {id: userId})
      console.log(user[0]);
      const profiles = await db.get('profiles', {user_id: userId})

    //   response.status(200).json({...user, profile: profile})
      return response.status(200).json({...user[0], profiles: profiles})
    } catch (error) {
      return response.status(400).json(error.detail)
    }
  };

module.exports = {
    getAccount
}