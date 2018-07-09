const users = require('../mock/users.json');
const mongoose = require('mongoose');
let User = require('../models/user');

module.exports = {
    importUsers: (request, response) => {
        User.insertMany(users, function(err, docs) {
            if (err) throw err;
            console.log('Number of documents inserted: ' + docs.length);
            response.send({result: 'Number of documents inserted: ' + docs.length});
        });
    },
    getAllUsers: (request, response) => {
        User.find({}, function(err, docs) {
            if (err) throw err;
            console.log('Number of documents founded: ' + docs.length);
            response.send(docs);
        });
    },
    deleteUserById: (request, response) => {
        let id = mongoose.Types.ObjectId(request.params.id);
        User.findByIdAndRemove(id, function (err, res) {
            if (err) {
                response.send(err);
                throw err;
            }
            response.send(res ? res : {result: `Document not found`});
        });
    }
};