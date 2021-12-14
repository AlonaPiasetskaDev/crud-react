const express = require("express");

const users = require("./handlers/users");
const profiles = require("./handlers/profile");
const auth = require("./auth");
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
router.post("/signout", auth.requireAuth, auth.handleSignout);

router.get("/users", auth.requireAuth, users.listUsers);
// router.put("/users/:userId", auth.requireAuth, users.updateUser);
// router.post("/users", auth.requireAuth, users.createUser);  ADMIN ONLY. Almost the same as handleSignup
// router.delete("/users/:userId", auth.requireAuth, users.updateUser);  ADMIN ONLY

router.get("/users/:userId/profiles", auth.requireAuth, profiles.listProfiles);
router.post(
  "/users/:userId/profiles",
  auth.requireAuth,
  profiles.createProfile
);
router.put(
  "/users/:userId/profiles/:profileId",
  auth.requireAuth,
  profiles.updateProfile
);
router.delete(
  "/users/:userId/profiles/:profileId",
  auth.requireAuth,
  profiles.deleteProfile
);

module.exports = router;
