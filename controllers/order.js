const Order = require('../models/Order');

const errorHandler = require('../utils/errorHandler');


module.exports.getAllOrder = async function (req, res) {
    try {
        const order = await Order.find({
            user: req.user.id
        });
        res.status(200).json(order);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.addOrder = async function (req, res) {
    try {
        const order = await new Order({
            date: req.body.date,
            order: req.body.order,
            list: [{
                name: '',
                quantity: '',
                cost: ''
            }],
            user_id: req.user.id
        }).save();
        res.status(201).json(order);
    } catch (e) {
        errorHandler(res, e);
    }
};