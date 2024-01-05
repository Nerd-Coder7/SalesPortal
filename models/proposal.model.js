const mongoose = require("mongoose");

const proposalSchema= new mongoose.Schema({
    companyName:{ type: String, required: true },
    portal:{type:mongoose.Schema.Types.ObjectId,ref:"portal",required:true},
    profile:{type:mongoose.Schema.Types.ObjectId,ref:"portalProfile",required:true},
    jobCategory:{type:mongoose.Schema.Types.ObjectId,ref:"jobCategory",required:true},
    proposalTitle:{ type: String, required: true },
    proposalLink:String,
    url:String,
    proposalType:{type:String,enum:["hourly","fixed"],required:true},
    currency:String,
    cost:{ type: Number, required: true },
    estimatedHours:{type:String},
    recievedAmount:Number,
    proposalDate:{type:Date,required:true},
    totalConnects:{type:Number},
    proposalDesc:String,
    proposal:{type:String}
});

module.exports = mongoose.model("proposal",proposalSchema);