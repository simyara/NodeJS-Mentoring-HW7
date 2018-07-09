const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: String,
    price: {
        type: Number,
        min: 0.01,
        required: true
    },
    color: String,
    size: String,
    lastModifiedDate: Date
});

productSchema.pre('save', function(next) {
    this.lastModifiedDate = Date.now();
    next();
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;