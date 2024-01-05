const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    location: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    interests: {
      type: String,
      default: "",
    },
target:{
type:Number,
default:null
},
    role: {
      type: String,
      default: "member",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ name: "text" });

userSchema.pre("save",async function(next){
  let user = this;
  if(!user.isModified("password")){
    return next()
  }
  try{
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  }catch(err){
    return next(err)
  }
})
module.exports = mongoose.model("User", userSchema);
