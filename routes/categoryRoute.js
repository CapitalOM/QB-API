const express = require('express');
const Category = require('../models/categoryModel');
const Question = require('../models/questionModel');
const {getCategories, getQuestionsByCategory, createCategory, updateCategory, deleteCategory, deleteCategories} = require('../controllers/categoryController')

const router = express.Router();

router.get("/", getCategories);

router.get("/:category", getQuestionsByCategory);

router.post('/', createCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

router.delete('/', deleteCategories);

// export routes to server
module.exports = router;