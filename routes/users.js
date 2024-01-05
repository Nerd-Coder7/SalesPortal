const router = require("express").Router();
const passport = require("passport");
const useragent = require("express-useragent");
const requestIp = require("request-ip");

const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/users/usersValidator");

const {
  sendLoginVerificationEmail,
} = require("../middlewares/users/verifyLogin");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
    signUpSignInLimiter
  } = require("../middlewares/limiter/limiter");
const { addUser, signin, refreshToken, logout, updateInfo, getUser } = require("../controllers/user.controller");
const requireAuth = passport.authenticate("jwt", { session: false }, null);
const decodeToken = require("../middlewares/auth/decodeToken");
router.post("/signup",signUpSignInLimiter,avatarUpload,addUserValidator,addUserValidatorHandler,addUser);
router.post(
    "/signin",
    signUpSignInLimiter,
    requestIp.mw(),
    useragent.express(),
    signin,
    sendLoginVerificationEmail
  );

  router.post("/refresh-token", refreshToken);
  router.post("/logout", logout);
  router.get("/:id", requireAuth, getUser);
  router.put("/:id", requireAuth, decodeToken, updateInfo);
  module.exports = router;