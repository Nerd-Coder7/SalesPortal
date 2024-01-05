const router = require("express").Router();

const {
  retrieveLogInfo,
  deleteLogInfo,
  signin,
} = require("../controllers/admin");

const requireAdminAuth = require("../middlewares/auth/adminAuth");
const {
  logLimiter,
  signUpSignInLimiter,
} = require("../middlewares/limiter/limiter");

router.post("/signin", signUpSignInLimiter, signin);

router.use(requireAdminAuth);

router
  .route("/logs")
  .get(logLimiter, retrieveLogInfo)
  .delete(logLimiter, deleteLogInfo);

module.exports = router;
