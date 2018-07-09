const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb://localhost:27017/';
const cities = require('../mock/cities.json');

let mongoose = require('mongoose');

let City = require('../models/city');

module.exports = {
    recreateCollection: (request, response) => {
        console.log('recreateCollection');

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db('HW7');
            console.log('Switched to '+dbo.databaseName+' database');
            dbo.dropCollection('cities', function(err, delOK) {
                if (err) throw err;
                if (delOK) console.log('Collection deleted');

                dbo.createCollection('cities', function(err, res) {
                    if (err) throw err;
                    console.log('Collection created!');
                    response.send({result: 'Collection created!'});
                    db.close();
                });
            });
        });
    },
    importCities: (request, response) => {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db('HW7');
            dbo.collection('cities').insertMany(cities, function(err, res) {
                if (err) throw err;
                console.log('Number of documents inserted: ' + res.insertedCount);
                response.send({result: 'Number of documents inserted: ' + res.insertedCount});
                db.close();
            });
        });
    },
    getRandomCity: (request, response) => {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db('HW7');
            dbo.collection('cities').find({}, function(err, r) {
                dbo.collection('cities').aggregate([
                    { $sample: { size: 1 } }
                ]).next(function(err, result) {
                    console.log(result);
                    response.send(result);
                    db.close();
                });
            });
        });
    },
    getRandomCityMongoose: (request, response) => {
        City.random().then((city) => response.send(city));
    },
    getAllCities: (request, response) => {
        City.find({}, function(err, docs) {
            if (err) throw err;
            console.log('Number of documents founded: ' + docs.length);
            response.send(docs);
        });
    },
    addNewCity: (request, response) => {
        let newCity = new City(request.body);

        let error = newCity.validateSync();
        if (error) {
            response.send({result: error});
        }
        else {
            newCity.save(function (err, doc) {
                if (err) {
                    response.send(err);
                    throw err;
                }
                response.send(doc);
            });
        }
    },
    updateOrAddCity: (request, response) => {
        let id = mongoose.Types.ObjectId(request.params.id);
        let obj = Object.assign({}, request.body, { lastModifiedDate: new Date() });

        if (id) {
            City.update({_id: id}, obj, {upsert: true}, (err, res) =>
            {
                if (err) {
                    response.send(err);
                    throw err;
                }

                response.send(res.nModified === 1 ? {result: `Document with id ${request.params.id} was updated `} : {result: `New document was created with id ${request.params.id}`});
            });
        }
    },
    deleteCityById: (request, response) => {
        let id = mongoose.Types.ObjectId(request.params.id);
        City.findByIdAndRemove(id, function (err, res) {
            if (err) {
                response.send(err);
                throw err;
            }
            response.send(res ? res : {result: `Document not found`});
        });
    },


};