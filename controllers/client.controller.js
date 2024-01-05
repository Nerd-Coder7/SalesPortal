

// Client Routes

const Client = require("../models/client.model");

/**
 * @route GET /detailed/Client
 */

const getClient = async (req, res) => {
  try {
    const data = await Client.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route POST /detailed/Client
 */

const createClient = async (req, res) => {
  try {
    const newClient = await Client.create({ ...req.body });
    res.status(201).json(newClient);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route PATCH /detailed/Client/:ClientId
 */

const updateClient = async (req, res) => {
  const { ClientId } = req.params;
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      { _id: ClientId },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route DELETE /detailed/Client/:ClientId
 */

const removeClient = async (req, res) => {
  const { ClientId } = req.params;
  try {
    await Client.findByIdAndDelete({ _id: ClientId });
    res.status(200).json({ message: "Removed successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getClient, createClient, updateClient, removeClient };
