const mongoose = require('mongoose')

const questionSchema = mongoose.Schema(
    {
        level: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        source: { // i.e. from protobowl, QANTA, quizbowlpackets scraper, manual, etc.
            type: String,
            required: true
        }, 
        tournament: String,
        round: String,
        num: Number,
        year: Number,
        
    }
)

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;