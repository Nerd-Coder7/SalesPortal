const mongoose = require("mongoose");

const proposalSchema= new mongoose.Schema({
    companyName:{ type: String, required: true },
    portal:{type:mongoose.Schema.Types.ObjectId,ref:"portal",required:true},
    profile:{type:mongoose.Schema.Types.ObjectId,ref:"portalProfile",required:true},
    jobCategory:{type:mongoose.Schema.Types.ObjectId,ref:"jobCategory",required:true},
    proposalTitle:{ type: String, required: true },
    proposalLink:String,
    url:String,
    proposalType:{type:String,enum:["hourly","fixed","-"],default:"-"},
    currency:String,
    cost:{ type: Number },
    estimatedHours:{type:String},
    receivedAmount:Number,
    proposalDate:{type:Date,default:Date.now()},
    totalConnects:{type:Number},
    proposalDesc:String,
    proposal:{type:String},
    status:{type:String,enum:["new","discussion","hired","completed","rejected","follow_up","pause","spam"]},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    client:{type:mongoose.Schema.Types.ObjectId,ref:"client"},
    connectsCost:{type:Number,default:0.15}
},{timestamps:true});

module.exports = mongoose.model("proposal",proposalSchema);