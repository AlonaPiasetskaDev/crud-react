const db = require("../lib/db");
const pool = db.pool;

const requireAuth = (request, response, next) => {
  if (request.session.loggedin) return next();
  else return response.sendStatus(401);
};

const requireAdmin = (request, response, next) => {
  console.log(request.session);
  if (request.session.admin) {
    return next();
  } else {
    return response.status(403).send("Requires admin permissions");
  }
};

const checkPermission = (request, response, next) => {
  console.log(request);
};

const requireOwner = (request, response, next) => {
  console.log(request);
  return next();
};

const handleSignin = async (request, response) => {
  const email = request.body.email;
  const password = String(request.body.password);
  if (!email || !password) {
    response.status(400).json("Missing credentials");
    return;
  }

  try {
    const data = await db.get("users", { email: email });
    console.log(data[0].password);
    if (data[0].password === password) {
      request.session.loggedin = true;
      request.session.userId = data[0].id;
      request.session.admin = data[0].isAdmin;
      return response.status(200).json("Authorized");
    } else {
      response.status(403).json({ error: "Bad credentials" });
      return;
    }
  } catch (error) {
    console.error(error.stack);
    response.status(403).json({ error: error });
    return;
  }
};

const handleSignup = async (request, response) => {
  const userParams = {
    email: request.body.email,
    password: request.body.email,
    isAdmin: false,
  };
  let profileParams = { name: request.body.name };
  if (request.body.birthday) {
    profileParams = {
      birthdate: new Date(...request.body.birthdate.split("-")),
      ...profileParams,
    };
  }

  try {
    const newUser = await db.create("users", userParams);
    const newProfiel = await db.create("profiles", {
      user_id: newUser.id,
      ...profileParams,
    });
    console.log(newProfiel);
    return response.status(201).json({ id: newUser.id });
  } catch (error) {
    console.error(error.stack);
    response.status(400).send(error.detail);
  }
  response.end();
};

const handleSignout = async (request, response) => {
  if (request.session.userId && request.session.loggedin) {
    request.session.destroy(function (err) {
      console.log(err);
    });
  }
  return response.status(200).json("Success");
};

module.exports = {
  requireOwner,
  requireAdmin,
  requireAuth,
  checkPermission,
  handleSignin,
  handleSignup,
  handleSignout,
};
