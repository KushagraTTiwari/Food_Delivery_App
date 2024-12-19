const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: String,
    items: [
      {
        itemId: String,
        name: String,
        quantity: Number,
        price: Number,
        size:String,
      },
    ],
  });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart