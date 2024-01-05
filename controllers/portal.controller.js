const Portal = require("../models/portal.model");

// PORTAL Routes

/**
 * @route GET /detailed/portal
 */

const getPortal = async (req, res) => {
  try {
    const data = await Portal.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route POST /detailed/portal
 */

const createPortal = async (req, res) => {
  const { portalName, link } = req.body;
  console.log(req.body)
  try {
    const data = await Portal.findOne({portalName:portalName});
    if (data) {
      return res
        .status(409)
        .json({ message: "You already have a portal with same name or link!" });
    }
    // console.log(data)
    const newPortal = await Portal.create({ portalName, link });

    res.status(201).json(newPortal);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route PATCH /detailed/portal/:portalId
 */

const updatePortal = async (req, res) => {
  const { portalId } = req.params;
  const { portalName, link } = req.body;
  try {
    const updatedPortal = await Portal.findByIdAndUpdate(
      { _id: portalId },
      { portalName, link },
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
 * @route DELETE /detailed/portal/:portalId
 */

const removePortal = async (req, res) => {
  const { portalId } = req.params;
  try {
    await Portal.findByIdAndDelete({ _id: portalId });
    res.status(200).json({ message: "Removed successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getPortal, createPortal, updatePortal, removePortal };
