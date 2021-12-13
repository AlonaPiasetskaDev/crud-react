const express = require("express");

const users = require("./handlers/users");
const profiles = require("./handlers/profile");
const auth = require("./lib/auth");
const account = require("./handlers/account")
const router = express.Router({ mergeParams: true });

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

router.post("/signin", auth.handleSignin);
router.post("/signup", auth.handleSignup);
router.route("/signout").post(auth.requireAuth, auth.handleSignout);

router.get("/account", auth.requireAuth, account.getAccount);

router.route("/users").get(auth.requireAdmin, users.listUsers);
router.route("/users/:id").get(auth.requireAuth, users.getUserById);
router.route("/users").post(auth.requireAdmin, users.createUser);
router.route("/users/:id").put(auth.requireAuth, auth.requireAdmin, users.updateUser);
router.route("/users/:id").delete(auth.requireAdmin, users.deleteUser);

router.get("/users/:userId/profiles", auth.requireAuth, profiles.listProfiles);
router.post("/users/:userId/profiles", auth.requireAuth, profiles.createProfile);
router.get("/users/:userId/profiles/:id", auth.requireAuth, profiles.getById);
router.post("/users", users.createUser);
router.put("/users/:userId", users.updateUser);
router.delete("/users/:userId", users.deleteUser);

module.exports = router