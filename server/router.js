const express = require("express");

const users = require("./handlers/users");
const profiles = require("./handlers/profile");
const auth = require("./lib/auth");
const router = express.Router({ mergeParams: true });

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.hostname} ${
      req.path
    } headers:${JSON.stringify(req.headers)} params:${JSON.stringify(
      req.params
    )} body:${JSON.stringify(req.body)} `
  );
  next();
});

router.post("/signin", auth.jwtLogin);
router.post("/signup", auth.handleSignup);
router.route("/signout").post(auth.requireAuth, auth.handleSignout);

router.route("/users").get(auth.requireAuth, users.listUsers);
router.get("/users/:userId/profiles", auth.requireAuth, profiles.listProfiles);


module.exports = router;
