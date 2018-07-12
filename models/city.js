const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let citySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    country: String,
    capital: {
        type: Boolean,
        required: true
    },
    location: {
        lat: Number,
        long: Number
    },
    lastModifiedDate: Date
});

citySchema.pre('save', function(next) {
    this.lastModifiedDate = Date.now();
    next();
});

citySchema.statics.random = async function() {
    const count = await this.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const randomDoc = await this.findOne().skip(rand);
    return randomDoc;
};

let City = mongoose.model('City', citySchema);

module.exports = City;