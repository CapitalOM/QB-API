const Category = require('../models/categoryModel')
const Question = require('../models/questionModel')
const asyncHandler = require('express-async-handler')
const qs = require('qs')

// get all questions
const getCategories = asyncHandler(async(req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// get questions with a specified category
const getQuestionsByCategory = asyncHandler(async(req, res) => {
    try {
        const {category} = req.params;

        // extract number of questions to pull (default is 3)
        let querySize = qs.parse(req.query, { ignoreQueryPrefix: true }) 
        if (!('size' in querySize)){
            querySize = { size: 3 };
        }

        const questions = await Question.aggregate(
            [ 
                { $match: { $expr: { category: category } } }, 
                { $sample: querySize } 
            ]
        );
        res.status(200).json(questions);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
        // res.status(500).json({message: error.message})
    }
})

// create a category
const createCategory = asyncHandler(async(req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// update a category
const updateCategory = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndUpdate(id, req.body);
        // Can't find product in database
        if(!category){
            res.status(404);
            throw new Error(`cannot find question with ID ${id}`);
        }
        const updatedCategory = await Category.findById(id);
        res.status(200).json(updatedCategory);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// delete a category
const deleteCategory = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id);
        if(!category){
            res.status(404);
            throw new Error(`cannot find category with ID ${id}`);
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// delete all categories
const deleteCategories = asyncHandler(async(req, res) => {
    try {
        const categories = await Category.deleteMany({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// export as a module to routes 
module.exports = {
    getCategories,
    getQuestionsByCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    deleteCategories
}