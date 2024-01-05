const Category = require("../models/category.model");

// JOB CATEGORY Routes

/**
 * @route GET /detailed/category
 */

const getCategory = async (req, res) => {
  try {
    const data = await Category.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route POST /detailed/category
 */

const createCategory = async (req, res) => {
  const { jobName, desc } = req.body;
  try {
    const data = await Category.findOne({jobName:jobName});
    if (data) {
      return res
        .status(409)
        .json({ message: "You already have a portal with same name or link!" });
    }
    const newCategory = await Category.create({ jobName, desc });

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route PATCH /detailed/category/:categoryId
 */

const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { jobName, desc } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryId },
      { jobName, desc },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route DELETE /detailed/category/:categoryId
 */

const removeCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    await Category.findByIdAndDelete({ _id: categoryId });
    res.status(200).json({ message: "Removed successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getCategory,
  createCategory,
  updateCategory,
  removeCategory,
};
