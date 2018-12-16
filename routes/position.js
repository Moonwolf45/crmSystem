const express = require('express');
const passport = require('passport');
const controller = require('../controllers/position');
const router = express.Router();


router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getAllPositionCategory);
router.post('/', passport.authenticate('jwt', {session: false}), controller.addPosition);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.editPosition);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deletePosition);

module.exports = router;