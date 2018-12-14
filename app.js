const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const categoryRoutes = require('./routes/category');
const positionRoutes = require('./routes/position');
const analyticsRoutes = require('./routes/analytics');
const keys = require('./config/keys');


const app = express();

mongoose.connect(keys.mongoURI, keys.mongoConfig).then(() => {
    console.log('Успех: MongoDB connection');
}).catch(error => {
    console.log('Ошибка: ' + error);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(cors());

app.use('/api', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(passport.initialize());
require('./middleware/passport')(passport);

module.exports = app;