const Question = require('../models/questionModel')
const asyncHandler = require('express-async-handler')
// 

// get all questions
const getQuestions = asyncHandler(async(req, res) => {
    try {
        const questions = await Question.find({});
        res.status(200).json(questions);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// get a single question
const getQuestion = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const question = await Question.findById(id);
        res.status(200).json(question);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
        // res.status(500).json({message: error.message})
    }
})

// create a question
const createQuestion = asyncHandler(async(req, res) => {
    try {
        const question = await Question.create(req.body);
        res.status(200).json(question);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// update a question
const updateQuestion = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const question = await Question.findByIdAndUpdate(id, req.body);
        // Can't find product in database
        if(!question){
            res.status(404);
            throw new Error(`cannot find question with ID ${id}`);
        }
        const updatedQuestion = await Question.findById(id);
        res.status(200).json(question);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// delete a question
const deleteQuestion = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const question = await Question.findByIdAndDelete(id);
        if(!question){
            res.status(404);
            throw new Error(`cannot find question with ID ${id}`);
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// delete all questions
const deleteQuestions = asyncHandler(async(req, res) => {
    try {
        const questions = await Question.findAndDelete({});
        res.status(200).json(questions);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// export as a module to routes 
module.exports = {
    getQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    deleteQuestions
}