
const mongoose = require('mongoose');

const ct2productsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    img: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('ct2products', ct2productsSchema);