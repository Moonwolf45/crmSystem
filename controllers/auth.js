const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');


module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

        if (passwordResult) {
            const token = jwt.sign({
                user_id: candidate._id,
                name: candidate.name,
                email: candidate.email
            }, keys.jwt, {
                expiresIn: 60 * 60 * 8
            });

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            });
        }
    } else {
        res.status(404).json({
            message: 'Введенный email не существует.'
        });
    }
};

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        res.status(409).json({
            message: 'Данный email уже занят. Попробуй другой.'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json({
                message: 'Регистрация прошла успешно.'
            });
        } catch (error) {
            errorHandler(res, error);
        }
    }
};