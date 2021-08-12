const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema ({
    itemId: {type: String},
    title: {type: String},
    price: {type: Number},
    quantity: {type: Number},
    img: {type: String}
});

module.exports = mongoose.model('Cart', cartSchema);