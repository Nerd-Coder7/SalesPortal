const Proposal = require("../models/proposal.model");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
// Proposal Routes

/**
 * @route GET /detailed/Proposal
 */

const getProposal = async (req, res) => {
  try {
    const { id } = req.query;
    const query = {}; 

    if (id) {
      query.creator = id; 
    }
    const data = await Proposal.find(query)
      .populate("creator", "name")
      .populate("portal", "portalName") // Populate the 'portal' field with 'portalName'
      .populate("jobCategory", "jobName")
      .populate("profile", "profileName")
      .populate("client", "clientName");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getSingleProposal = async (req, res) => {
  const { ProposalId } = req.params;
  try {
    const data = await Proposal.findById({ _id: ProposalId })
      .populate("creator", "name")
      .populate("portal", "portalName") // Populate the 'portal' field with 'portalName'
      .populate("jobCategory", "jobName")
      .populate("profile", "profileName")
      .populate("client", "clientName").sort({createdAt:-1});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route POST /detailed/Proposal
 */

const createProposal = async (req, res) => {
  try {
 const {client,...others}=req.body;
 let newProposal ;
 if(client){
  newProposal = await Proposal.create({ ...req.body });

 }else{
  newProposal = await Proposal.create({ ...others });
 }

    res.status(201).json(newProposal);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route PATCH /detailed/Proposal/:ProposalId
 */

const updateProposal = async (req, res) => {
  const { ProposalId } = req.params;
  try {
    const updatedProposal = await Proposal.findByIdAndUpdate(
      { _id: ProposalId },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedProposal);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route DELETE /detailed/Proposal/:ProposalId
 */

const removeProposal = async (req, res) => {
  const { ProposalId } = req.params;
  try {
    await Proposal.findByIdAndDelete({ _id: ProposalId });
    res.status(200).json({ message: "Removed successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// const getAllStats = async (req, res) => {
//   const currentDate = new Date();
//   const startOfMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     1
//   );
//   console.log(currentDate, startOfMonth);

//   // Get stats for the current month
//   const monthlyStats = await Proposal.aggregate([
//     {
//       $match: {
//         proposalDate: { $gte: startOfMonth, $lte: currentDate },
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalConnects: { $sum: "$totalConnects" },
//         totalSales: { $sum: "$cost" },
//         totalMoneyUsedOnConnects: {
//           $sum: { $multiply: ["$totalConnects", "$connectsCost"] },
//         },
//         totalProposals: { $sum: 1 },
//         totalReceivedAmount: { $sum: "$receivedAmount" },
//       },
//     },
//   ]);

//   // Get stats for all time
//   const allTimeStats = await Proposal.aggregate([
//     {
//       $group: {
//         _id: null,
//         totalConnects: { $sum: "$totalConnects" },
//         totalSales: { $sum: "$cost" },
//         totalMoneyUsedOnConnects: {
//           $sum: { $multiply: ["$totalConnects", "$connectsCost"] },
//         },
//         totalProposals: { $sum: 1 },
//         totalReceivedAmount: { $sum: "$receivedAmount" },
//       },
//     },
//   ]);

//   // Get stats for the current year
//   const currentYearStats = await Proposal.aggregate([
//     {
//       $match: {
//         proposalDate: { $gte: new Date(currentDate.getFullYear(), 0, 1), $lte: currentDate },
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalConnects: { $sum: "$totalConnects" },
//         totalSales: { $sum: "$cost" },
//         totalMoneyUsedOnConnects: {
//           $sum: { $multiply: ["$totalConnects", "$connectsCost"] },
//         },
//         totalProposals: { $sum: 1 },
//         totalReceivedAmount: { $sum: "$receivedAmount" },
//       },
//     },
//   ]);

//   // Extract the results
//   const monthlyResult = monthlyStats[0] || {
//     totalConnects: 0,
//     totalSales: 0,
//     totalMoneyUsedOnConnects: 0,
//     totalProposals: 0,
//     totalReceivedAmount: 0,
//   };

//   const allTimeResult = allTimeStats[0] || {
//     totalConnects: 0,
//     totalSales: 0,
//     totalMoneyUsedOnConnects: 0,
//     totalProposals: 0,
//     totalReceivedAmount: 0,
//   };

//   const currentYearResult = currentYearStats[0] || {
//     totalConnects: 0,
//     totalSales: 0,
//     totalMoneyUsedOnConnects: 0,
//     totalProposals: 0,
//     totalReceivedAmount: 0,
//   };

//   res.status(200).send({
//     monthly: monthlyResult,
//     allTime: allTimeResult,
//     currentYear: currentYearResult,
//   });
// };

// const getAllStats = async (req, res) => {
//   const currentDate = new Date();
//   const startOfMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     1
//   );

//   // Get stats for the current month
//   const monthlyStats = await Proposal.aggregate([
//     {
//       $match: {
//         proposalDate: { $gte: startOfMonth, $lte: currentDate },
//       },
//     },
//     {
//       $addFields: {
//         totalCost: {
//           $cond: {
//             if: { $eq: ["$proposalType", "hourly"] },
//             then: { $multiply: ["$cost", { $toInt: "$estimatedHours" }] },
//             else: "$cost",
//           },
//         },
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalConnects: { $sum: "$totalConnects" },
//         totalSales: { $sum: "$totalCost" },
//         totalMoneyUsedOnConnects: {
//           $sum: { $multiply: ["$totalConnects", "$connectsCost"] },
//         },
//         totalProposals: { $sum: 1 },
//         totalReceivedAmount: { $sum: "$receivedAmount" },
//       },
//     },
//   ]);

//   // Get stats for all time
//   const allTimeStats = await Proposal.aggregate([
//     {
//       $addFields: {
//         totalCost: {
//           $cond: {
//             if: { $eq: ["$proposalType", "hourly"] },
//             then: { $multiply: ["$cost", { $toInt: "$estimatedHours" }] },
//             else: "$cost",
//           },
//         },
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalConnects: { $sum: "$totalConnects" },
//         totalSales: { $sum: "$totalCost" },
//         totalMoneyUsedOnConnects: {
//           $sum: { $multiply: ["$totalConnects", "$connectsCost"] },
//         },
//         totalProposals: { $sum: 1 },
//         totalReceivedAmount: { $sum: "$receivedAmount" },
//       },
//     },
//   ]);

//   // Get stats for the current year
//   const currentYearStats = await Proposal.aggregate([
//     {
//       $match: {
//         proposalDate: { $gte: new Date(currentDate.getFullYear(), 0, 1), $lte: currentDate },
//       },
//     },
//     {
//       $addFields: {
//         totalCost: {
//           $cond: {
//             if: { $eq: ["$proposalType", "hourly"] },
//             then: { $multiply: ["$cost", { $toInt: "$estimatedHours" }] },
//             else: "$cost",
//           },
//         },
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalConnects: { $sum: "$totalConnects" },
//         totalSales: { $sum: "$totalCost" },
//         totalMoneyUsedOnConnects: {
//           $sum: { $multiply: ["$totalConnects", "$connectsCost"] },
//         },
//         totalProposals: { $sum: 1 },
//         totalReceivedAmount: { $sum: "$receivedAmount" },
//       },
//     },
//   ]);

//   // Extract the results
//   const monthlyResult = monthlyStats[0] || {
//     totalConnects: 0,
//     totalSales: 0,
//     totalMoneyUsedOnConnects: 0,
//     totalProposals: 0,
//     totalReceivedAmount: 0,
//   };

//   const allTimeResult = allTimeStats[0] || {
//     totalConnects: 0,
//     totalSales: 0,
//     totalMoneyUsedOnConnects: 0,
//     totalProposals: 0,
//     totalReceivedAmount: 0,
//   };

//   const currentYearResult = currentYearStats[0] || {
//     totalConnects: 0,
//     totalSales: 0,
//     totalMoneyUsedOnConnects: 0,
//     totalProposals: 0,
//     totalReceivedAmount: 0,
//   };

//   res.status(200).send({
//     monthly: monthlyResult,
//     allTime: allTimeResult,
//     currentYear: currentYearResult,
//   });
// };

const getAllStats = async (req, res) => {
  const {id}=req.query;
  console.log(req.params)
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const match = {
    $match: {
      proposalDate: { $gte: startOfMonth, $lte: currentDate },
    },
  };
  
  if (id) {
    match.$match.creator = new ObjectId(id);
  }
console.log(match)
  // Get stats for the current month
  const monthlyStats = await Proposal.aggregate([
    match,
    {
      $addFields: {
        totalCost: {
          $cond: {
            if: {
              $and: [
                { $eq: ["$proposalType", "hourly"] },
                { $ne: ["$estimatedHours", ""] },
              ],
            },
            then: {
              $multiply: ["$cost", { $toInt: "$estimatedHours" }],
            },
            else: "$cost",
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalConnects: { $sum: "$totalConnects" },
        totalSales: { $sum: "$totalCost" },
        totalMoneyUsedOnConnects: {
          $sum: { $multiply: ["$totalConnects", "$connectsCost"] },
        },
        totalProposals: { $sum: 1 },
        totalReceivedAmount: { $sum: "$receivedAmount" },
      },
    },
  ]);

  // Get stats for all time
  const allTimeStats = await Proposal.aggregate([
    {
      $addFields: {
        totalCost: {
          $cond: {
            if: {
              $and: [
                { $eq: ["$proposalType", "hourly"] },
                { $ne: ["$estimatedHours", ""] },
              ],
            },
            then: {
              $multiply: ["$cost", { $toInt: "$estimatedHours" }],
            },
            else: "$cost",
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalConnects: { $sum: "$totalConnects" },
        totalSales: { $sum: "$totalCost" },
        totalMoneyUsedOnConnects: {
          $sum: { $multiply: ["$totalConnects", "$connectsCost"] },
        },
        totalProposals: { $sum: 1 },
        totalReceivedAmount: { $sum: "$receivedAmount" },
      },
    },
  ]);

  // Get stats for the current year
  const currentYearStats = await Proposal.aggregate([
    {
      $match: {
        proposalDate: { $gte: new Date(currentDate.getFullYear(), 0, 1), $lte: currentDate },
      },
    },
    {
      $addFields: {
        totalCost: {
          $cond: {
            if: {
              $and: [
                { $eq: ["$proposalType", "hourly"] },
                { $ne: ["$estimatedHours", ""] },
              ],
            },
            then: {
              $multiply: ["$cost", { $toInt: "$estimatedHours" }],
            },
            else: "$cost",
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalConnects: { $sum: "$totalConnects" },
        totalSales: { $sum: "$totalCost" },
        totalMoneyUsedOnConnects: {
          $sum: { $multiply: ["$totalConnects", "$connectsCost"] },
        },
        totalProposals: { $sum: 1 },
        totalReceivedAmount: { $sum: "$receivedAmount" },
      },
    },
  ]);

  // Extract the results
  const monthlyResult = monthlyStats[0] || {
    totalConnects: 0,
    totalSales: 0,
    totalMoneyUsedOnConnects: 0,
    totalProposals: 0,
    totalReceivedAmount: 0,
  };

  const allTimeResult = allTimeStats[0] || {
    totalConnects: 0,
    totalSales: 0,
    totalMoneyUsedOnConnects: 0,
    totalProposals: 0,
    totalReceivedAmount: 0,
  };

  const currentYearResult = currentYearStats[0] || {
    totalConnects: 0,
    totalSales: 0,
    totalMoneyUsedOnConnects: 0,
    totalProposals: 0,
    totalReceivedAmount: 0,
  };

  res.status(200).send({
    monthly: monthlyResult,
    allTime: allTimeResult,
    currentYear: currentYearResult,
  });
};

module.exports = {
  getAllStats,
  getProposal,
  getSingleProposal,
  createProposal,
  updateProposal,
  removeProposal,
};
