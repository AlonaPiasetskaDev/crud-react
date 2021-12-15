const getStats = async (request, response) => {

  try {
    response.status(200).json({"users": 5, "profiles": 10})
  } catch (error) {
    console.log(error)
  }
};

module.exports={
  getStats
}
