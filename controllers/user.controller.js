const { saveLogInfo } = require("../middlewares/logger/logInfo");

const { sendVerificationEmail } = require("../middlewares/users/verifyEmail");
const tokenModel = require("../models/token.model");
const userModel = require("../models/user.model");
const { MESSAGE, AUTH_TYPE, LEVEL, TYPES } = require("../utils/types");
const { verifyContextData } = require("./auth.controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const defaultAvatar =
    "https://pic.onlinewebfonts.com/thumbnails/icons_264157.svg";
  const fileUrl = req.files?.[0]?.filename
    ? `${req.protocol}://${req.get("host")}/assets/userAvatars/${
        req.files[0].filename
      }`
    : defaultAvatar;

  let newUser = new userModel({
    name,
    email,
    password,
    avatar: fileUrl,
  });

  try {
    await newUser.save();
    if (newUser.isNew) {
      throw new Error("Failed to add user");
    } else {
      res.status(201).json({
        message: "User added successfully",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Failed to add user",
    });
  }
};

const signin = async (req, res, next) => {
  await saveLogInfo(
    req,
    MESSAGE.SIGN_IN_ATTEMPT,
    AUTH_TYPE.SIGN_IN,
    LEVEL.INFO
  );
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({
      email: email,
    });
    if (!existingUser) {
      await saveLogInfo(
        req,
        MESSAGE.INCORRECT_EMAIL,
        AUTH_TYPE.SIGN_IN,
        LEVEL.ERROR
      );
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log(isPasswordCorrect)
    if (!isPasswordCorrect) {
      await saveLogInfo(
        req,
        MESSAGE.INCORRECT_PASSWORD,AUTH_TYPE.SIGN_IN,
        LEVEL.ERROR
      );
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
//     const isContextAuthEnabled = existingUser.isEmailVerified;
//     if (!isContextAuthEnabled) {
//      if(sendVerificationEmail("dear",email)){
//        return res.status(200).json({
//             message: `Verification email was successfully sent to ${email}`,
//           });
//      }else{
//         res.status(500).json({
//             message: "Something went wrong!"
//           });
//      }

//     } else {
//       const contextDataResult = await verifyContextData(req, existingUser);
// console.log(contextDataResult)
//       if (contextDataResult === TYPES.BLOCKED) {
//         await saveLogInfo(
//           req,
//           MESSAGE.DEVICE_BLOCKED,
//           AUTH_TYPE.SIGN_IN,
//           LEVEL.WARNING
//         );

//         return res.status(401).json({
//           message:
//             "You've been blocked due to suspicious login activity. Please contact support for assistance.",
//         });
//       }
//       if (
//         contextDataResult === TYPES.NO_CONTEXT_DATA ||
//         contextDataResult === TYPES.ERROR
//       ) {
//         await saveLogInfo(
//           req,
//           MESSAGE.CONTEXT_DATA_VERIFY_ERROR,
//           AUTH_TYPE.SIGN_IN,
//           LEVEL.ERROR
//         );

//         return res.status(500).json({
//           message: "Error occurred while verifying context data",
//         });
//       }

//       if (contextDataResult === TYPES.SUSPICIOUS) {
//         await saveLogInfo(
//           req,
//           MESSAGE.MULTIPLE_ATTEMPT_WITHOUT_VERIFY,
//           AUTH_TYPE.SIGN_IN,
//           LEVEL.WARN
//         );

//         return res.status(401).json({
//           message: `You've temporarily been blocked due to suspicious login activity. We have already sent a verification email to your registered email address. 
//           Please follow the instructions in the email to verify your identity and gain access to your account.

//           Please note that repeated attempts to log in without verifying your identity will result in this device being permanently blocked from accessing your account.
          
//           Thank you for your cooperation`,
//         });
//       }

//       if (contextDataResult.mismatchedProps) {
//         const mismatchedProps = contextDataResult.mismatchedProps;
//         const currentContextData = contextDataResult.currentContextData;
//         if (
//           mismatchedProps.some((prop) =>
//             [
//               "ip",
//               "country",
//               "city",
//               "device",
//               "deviceLOG_TYPE",
//               "os",
//               "platform",
//               "browser",
//             ].includes(prop)
//           )
//         ) {
//           req.mismatchedProps = mismatchedProps;
//           req.currentContextData = currentContextData;
//           req.user = existingUser;
//           return next();
//         }
//       }
//     }
    const payload = {
        id: existingUser._id,
        email: existingUser.email,
      };
  
      const accessToken = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "6h",
      });
  
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "7d",
      });
  
      const newRefreshToken = new tokenModel({
        user: existingUser._id,
        refreshToken,
        accessToken,
      });
      await newRefreshToken.save();
  
      res.status(200).json({
        accessToken,
        refreshToken,
        accessTokenUpdatedAt: new Date().toLocaleString(),
        user: {
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          avatar: existingUser.avatar,
        },
      });
  } catch (err) {
    await saveLogInfo(
      req,
      MESSAGE.SIGN_IN_ERROR + err.message,
      AUTH_TYPE.SIGN_IN,
      LEVEL.ERROR
    );

    res.status(500).json({
      message: err.message,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const existingToken = await tokenModel.findOne({
      refreshToken: { $eq: refreshToken },
    });
    if (!existingToken) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }
    const existingUser = await userModel.findById(existingToken.user);
    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const refreshTokenExpiresAt =
      jwt.decode(existingToken.refreshToken).exp * 1000;
    if (Date.now() >= refreshTokenExpiresAt) {
      await existingToken.deleteOne();
      return res.status(401).json({
        message: "Expired refresh token",
      });
    }

    const payload = {
      id: existingUser._id,
      email: existingUser.email,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "6h",
    });

    res.status(200).json({
      accessToken,
      refreshToken: existingToken.refreshToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1] ?? null;
    if (accessToken) {
      await tokenModel.deleteOne({ accessToken });
      await saveLogInfo(
        null,
        MESSAGE.LOGOUT_SUCCESS,
        LOG_TYPE.LOGOUT,
        LEVEL.INFO
      );
    }
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    await saveLogInfo(null, err.message, AUTH_TYPE.LOGOUT, LEVEL.ERROR);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};

const updateInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { location, interests, bio } = req.body;

    user.location = location;
    user.interests = interests;
    user.bio = bio;

    await user.save();

    res.status(200).json({
      message: "User info updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating user info",
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password").lean();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const user = await userModel.find();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


module.exports = { addUser,getUsers, signin, refreshToken,logout, updateInfo, getUser };
