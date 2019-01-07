const Position = require('../models/Position');

const errorHandler = require('../utils/errorHandler');


module.exports.getAllPositionCategory = async function (req, res) {
    try {
        const positions = await Position.find({
            category_id: req.params.categoryId,
            user_id: req.user.id
        });
        res.status(200).json(positions);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.addPosition = async function (req, res) {
    try {
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category_id: req.body.category,
            user_id: req.user.id
        }).save();
        res.status(201).json(position);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.editPosition = async function (req, res) {
    try {
        const position = await Position.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            new: true
        });
        res.status(200).json(position);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.deletePosition = async function (req, res) {
    try {
        await Position.deleteOne({
            _id: req.params.id
        });
        res.status(200).json({
            message: 'Позиция была удалена'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};