const products = require('../mock/products.json');
const mongoose = require('mongoose');
let Product = require('../models/product');

module.exports = {
    importProducts: (request, response) => {
        Product.insertMany(products, function(err, docs) {
            if (err) throw err;
            console.log('Number of documents inserted: ' + docs.length);
            response.send({result: 'Number of documents inserted: ' + docs.length});
        });
    },
    getAllProducts: (request, response) => {
        Product.find({}, function(err, docs) {
            if (err) throw err;
            console.log('Number of documents founded: ' + docs.length);
            response.send(docs);
        });
    },
    getProductById: (request, response) => {
        let id = mongoose.Types.ObjectId(request.params.id);
        Product.findById(id, function (err, res) {
            if (err) {
                response.send(err);
                throw err;
            }
            response.send(res ? res : {result: 'Document not found'});
        });
    },
    deleteProductById: (request, response) => {
        let id = mongoose.Types.ObjectId(request.params.id);
        Product.findByIdAndRemove(id, function (err, res) {
            if (err) {
                response.send(err);
                throw err;
            }
            response.send(res ? res : {result: 'Document not found'});
        });
    },
    addNewProduct: (request, response) => {
        let newProduct = new Product(request.body);

        let error = newProduct.validateSync();
        if (error) response.send({result: error});
        else {
            newProduct.save(function (err, doc) {
                if (err) {
                    response.send(err);
                    throw err;
                }
                response.send(doc);
            });
        }
    }
};