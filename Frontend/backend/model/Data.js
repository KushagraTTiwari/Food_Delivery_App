const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    // Add any other fields based on your collection structure
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
