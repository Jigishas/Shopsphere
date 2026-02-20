const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: [true, "Please Enter the product ID "], unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    image: { type: String, required: true },
    badge: { type: String },
    isDeal: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Products', productSchema);
