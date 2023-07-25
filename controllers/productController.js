const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

// get all products
const getProducts = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// get a single product
const getProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
        // res.status(500).json({message: error.message})
    }
})

// create a product
const createProduct = asyncHandler(async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// update a product
const updateProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // Can't find product in database
        if(!product){
            res.status(404);
            throw new Error(`cannot find product with ID ${id}`);
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// delete a product
const deleteProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404);
            throw new Error(`cannot find product with ID ${id}`);
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// export as a module to routes 
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}