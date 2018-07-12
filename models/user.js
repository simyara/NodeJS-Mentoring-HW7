const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: String,
    lastModifiedDate: Date
});

userSchema.pre('save', function(next) {
    this.lastModifiedDate = Date.now();
    next();
});

let User = mongoose.model('User', userSchema);

module.exports = User;
