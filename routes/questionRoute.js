const express = require('express');
const Question = require('../models/questionModel')
const {getQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion} = require('../controllers/questionController')

const router = express.Router();

router.get("/", getQuestions);

router.get("/:id", getQuestion);

router.post('/', createQuestion);

router.put('/:id', updateQuestion);

router.delete('/:id', deleteQuestion);

// export routes to server
module.exports = router;