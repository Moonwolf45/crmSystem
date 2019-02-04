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
const path = require('path');


const app = express();

mongoose.connect(keys.mongoURI, keys.mongoConfig).then(() => {
    console.log('Успех: MongoDB connection');
}).catch(error => {
    console.log('Ошибка: ' + error);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(cors());

app.use('/api', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(passport.initialize());
require('./middleware/passport')(passport);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'));

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'client', 'dist', 'client', 'index.html')
        );
    });
}

module.exports = app;