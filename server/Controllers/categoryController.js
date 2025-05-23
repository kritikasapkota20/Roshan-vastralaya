const asyncHandler = require("express-async-handler");
const Category = require("../Models/categoryModel");

// Create Category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const categoryFound = await Category.find({ title: req.body.title });

    console.log(categoryFound);

    if (categoryFound.length) {
      return res.json({
        success: false,
        message: "Category Already Exists",
      });
    }

    const category = new Category({
      title: req.body.title,
    });

    await category.save();
    const categories = await Category.find({});
    res.json({
      success: true,
      message: "Category Added",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
  console.log(req.body);
});

// get categories
const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({
      success: true,
      message: "Fetched Categories",
      categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (deletedCategory) {
      return res.json({
        success: true,
        message: "Category Deleted",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCategory, getCategories, deleteCategory };
