const PortalProfile = require("../models/portalProfile.model");

// PORTALPROFILE Routes

/**
 * @route GET /detailed/portalProfile
 */

const getPortalProfile = async (req, res) => {
  try {
    const data = await PortalProfile.find().populate('portal', 'portalName') // Populate the 'portal' field with 'portalName'
    .populate('jobCategory', 'jobName');;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route POST /detailed/portalProfile
 */

const createPortalProfile = async (req, res) => {
  const { profileName, portalId, jobCategoryId, profileLink } = req.body;
  try {
    const data = await PortalProfile.findOne({profileName:profileName});
    if (data) {
      return res
        .status(409)
        .json({ message: "You already have a profile with same name!" });
    }
    const newPortalProfile = await PortalProfile.create({
      profileName,
      portal:portalId,
      jobCategory:jobCategoryId,
      profileLink,
    });

    res.status(201).json(newPortalProfile);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route PATCH /detailed/portalProfile/:portalProfileId
 */

const updatePortalProfile = async (req, res) => {
  const { portalProfileId } = req.params;
  const { profileName, portal, jobCategory, profileLink } = req.body;
  try {
    const updatedPortal = await PortalProfile.findByIdAndUpdate(
      { _id: portalProfileId },
      { profileName, portal, jobCategory, profileLink },
      { new: true }
    );
    res.status(200).json(updatedPortal);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route DELETE /detailed/portalProfile/:portalProfileId
 */

const removePortalProfile = async (req, res) => {
  const { portalProfileId } = req.params;
  try {
    await PortalProfile.findByIdAndDelete({ _id: portalProfileId });
    res.status(200).json({ message: "Removed successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getPortalProfile,
  createPortalProfile,
  updatePortalProfile,
  removePortalProfile,
};
