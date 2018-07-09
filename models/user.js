var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
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

var User = mongoose.model('User', userSchema);

module.exports = User;