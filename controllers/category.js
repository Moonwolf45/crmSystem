const Category = require('../models/Category');
const Position = require('../models/Position');

const errorHandler = require('../utils/errorHandler');


module.exports.getAllCategory = async function (req, res) {
    try {
        const categories = await Category.find({
            user: req.user.id
        });
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getCategory = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.removeCategory = async function (req, res) {
    try {
        await Category.remove({
            _id: req.params.id
        });
        await Position.remove({
            category: req.params.id
        });
        res.status(200).json({
            message: 'Категория была удалена'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.addCategory = async function (req, res) {
    const category = new Category({
        name: req.body.name,
        imageSrc: req.file ? req.file.path : '',
        user_id: req.user.id
    });

    try {
        await category.save();
        res.status(201).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.editCategory = async function (req, res) {
    const updated = {
        name: req.body.name
    };

    if (req.file) {
        updated.imageSrc = req.file.path;
    }

    try {
        const category = await Category.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: updated
        }, {
            new: true
        });
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};