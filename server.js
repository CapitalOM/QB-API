// configure env from .env file
require('dotenv').config();

// import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const queryType = require('query-types');

// import routes
const questionRoute = require('./routes/questionRoute');
const categoryRoute = require('./routes/categoryRoute');

// import middleware
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// define .env variables
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3000
const FRONTEND = process.env.FRONTEND

// restrict CORS access to one site
const corsOption = {
    origin: FRONTEND,
    optionsSuccessStatus: 200
}

// implement middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(corsOption));
app.use(errorMiddleware);
app.use(queryType.middleware());

// implement routes
app.use('/api/questions', questionRoute);
app.use('/api/categories', categoryRoute);

// connect to MongoDB database
mongoose.connect(MONGO_URI)
.then(() => {
    console.log(`Connected to MongoDB`)

    // Connects to Node app port 3000
    app.listen(PORT, () => {
        console.log(`Node API app is running on port ${PORT}.`)
    })
}).catch((error) => {
    console.log(error)
})