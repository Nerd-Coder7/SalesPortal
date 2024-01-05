 const AUTH_TYPE = {
  SIGN_IN: "sign in",
  SIGN_OUT: "sign out",
  SIGN_UP: "sign up",
};

 const LEVEL = {
  INFO: "info",
  ERROR: "error",
  WARNING: "warning",
};

 const MESSAGE = {
  SIGN_IN_ATTEMPT: "User attempting to sign in",
  SIGN_IN_ERROR: "Error occurred while signing in user: ",
  INCORRECT_EMAIL: "Incorrect email",
  INCORRECT_PASSWORD: "Incorrect password",
  DEVICE_BLOCKED: "Sign in attempt from blocked device",
  CONTEXT_DATA_VERIFY_ERROR: "Context data verification failed",
  MULTIPLE_ATTEMPT_WITHOUT_VERIFY:
    "Multiple sign in attempts detected without verifying identity.",
  LOGOUT_SUCCESS: "User has logged out successfully",
};

 const TYPES = {
    NO_CONTEXT_DATA: "no_context_data",
    MATCH: "match",
    BLOCKED: "blocked",
    SUSPICIOUS: "suspicious",
    ERROR: "error",
  };


  module.exports = {MESSAGE,TYPES,LEVEL,AUTH_TYPE};