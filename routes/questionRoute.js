const express = require('express');
const Question = require('../models/questionModel')
const {getQuestions, getRandomQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion, deleteQuestions} = require('../controllers/questionController')

const router = express.Router();

router.get("/", getQuestions);

router.get("/random", getRandomQuestions);

router.get("/:id", getQuestion);

router.post('/', createQuestion);

router.put('/:id', updateQuestion);

router.delete('/:id', deleteQuestion);

router.delete('/', deleteQuestions);

// export routes to server
module.exports = router;