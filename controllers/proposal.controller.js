const Proposal = require("../models/proposal.model");

// Proposal Routes

/**
 * @route GET /detailed/Proposal
 */

const getProposal = async (req, res) => {
  try {
    const data = await Proposal.find().populate("creator","name").populate('portal', 'portalName') // Populate the 'portal' field with 'portalName'
    .populate('jobCategory', 'jobName').populate("profile","profileName").populate("client","clientName");
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
    const data = await Proposal.findById({_id:ProposalId}).populate("creator","name").populate('portal', 'portalName') // Populate the 'portal' field with 'portalName'
    .populate('jobCategory', 'jobName').populate("profile","profileName").populate("client","clientName");
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
    const newProposal = await Proposal.create({ ...req.body });

    res.status(201).json(newProposal);
  } catch (err) {
    console.log(err)
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

module.exports = { getProposal,getSingleProposal, createProposal, updateProposal, removeProposal };
