let mongoose = require('mongoose');
let mongoDB = 'mongodb://localhost/HW7';
mongoose.connect(mongoDB);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('Connect');
});

const cityController = require('./controllers/cityController');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.post('/recreateCollection', cityController.recreateCollection);
app.post('/importCities', cityController.importCities);
app.get('/api/city', cityController.getRandomCity);
app.get('/api/rcity', cityController.getRandomCityMongoose);
app.get('/api/cities', cityController.getAllCities);
app.post('/api/cities', bodyParser.json(), cityController.addNewCity);
app.put('/api/cities/:id', bodyParser.json(), cityController.updateOrAddCity);
app.delete('/api/cities/:id', cityController.deleteCityById);

app.post('/importUsers', userController.importUsers);
app.get('/api/users', userController.getAllUsers);
app.delete('/api/users/:id', userController.deleteUserById);

app.post('/importProducts', productController.importProducts);
app.get('/api/products', productController.getAllProducts);
app.get('/api/products/:id', productController.getProductById);
app.delete('/api/products/:id', productController.deleteProductById);
app.post('/api/products', bodyParser.json(), productController.addNewProduct);


app.listen(port, (err) => {
    if (err) {
        return console.log('Error: ', err);
    }
    console.log(`Server is listening on ${port}`);
});
