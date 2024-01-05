const mongoose = require("mongoose");

const portalProfileSchema= new mongoose.Schema({
    profileName:{ type: String, required: true },
    portal:{type:mongoose.Schema.Types.ObjectId,ref:"portal",required:true},
    jobCategory:{type:mongoose.Schema.Types.ObjectId,ref:"jobCategory",required:true},
    profileLink:{ type: String, required: true },
});

module.exports = mongoose.model("portalProfile",portalProfileSchema);