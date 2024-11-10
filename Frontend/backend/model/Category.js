const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    // Add any other fields based on your collection structure
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;