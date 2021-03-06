const jwt = require("jsonwebtoken");
const Settings = require("./conf");

const { User, Profile, Session } = require("./models");

const requireAuth = async (request, response, next) => {
  const token = request.header("authorization");

  //check token
  if (token == null) {
    return response.status(401).json({ error: "Access-denied" });
  }
  //check validity
  try {
    const saved = await Session.findOne({ where: { token: token } });
    console.log(saved);
    if (saved && saved.token === token) {
      const user = await jwt.verify(token, Settings.jwt.secret);
      console.log(user);
      request.user = user; //if verified the token will be decoded and the username of the user will be extracted and passed.
      next();
    } else {
      response.status(401).json({ error: "Unauthorized" });
    }
  } catch (e) {
    response.status(401).json({ error: e });
  }
};

const jwtLogin = async (request, response) => {
  let creds = request.body;

  const user = await User.findOne({
    where: { email: creds.email, password: creds.password },
  });
  if (user) {
    const data = { id: user.id, email: user.email, isAdmin: user.isAdmin };
    const accessToken = jwt.sign(data, Settings.jwt.secret, {
      expiresIn: "2592000s",
    });
    await user.createSession({ token: accessToken });
    console.log(user, accessToken);

    response.status(201).json({ token: accessToken, user: user });
  } else {
    response.status(502).json({ error: "Wrong username or Password" });
  }
};

const handleSignup = async (request, response) => {
  const params = {
    email: request.body.email,
    password: request.body.password,
    isAdmin: request.body.isAdmin,
    name: request.body.name,
  };
  if (request.body.birthdate) {
    params.profiles = [
      { birthdate: new Date(request.body.birthdate), name: request.body.name },
    ];
  }

  try {
    console.log(params);
    const newUser = await User.create(params, { include: [Profile] });
    if (newUser) {
      response.status(201).json({ id: newUser.id });
    }
  } catch (error) {
    console.error(error);
    response.status(400).send(error);
  }
  response.end();
};

const handleSignout = async (request, response) => {
  const token = request.header("authorization");

  //check token
  if (token == null) {
    return response.status(401).json({ error: "Access-denied" });
  }
  //check validity
  try {
    const saved = await Session.findOne({ where: { token: token } });

    if (saved && saved.token === token) {
      request.user = null;
      await saved.destroy();
      response.status(200).json("Success");
    } else {
      response.status(401).json({ error: "Unauthorized" });
    }
  } catch (e) {
    response.status(401).json({ error: e });
  }
};

module.exports = {
  jwtLogin,
  requireAuth,
  handleSignup,
  handleSignout,
};
