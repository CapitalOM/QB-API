const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        subtype: {
            type: String,
            required: false
        }
    }
)

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;