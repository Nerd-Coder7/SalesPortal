const mongoose = require("mongoose");

const jobcategorySchema= new mongoose.Schema({
    jobName:{ type: String, required: true },
    desc:String
});

module.exports = mongoose.model("jobCategory",jobcategorySchema);