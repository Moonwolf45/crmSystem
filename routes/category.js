const express = require('express');
const passport = require('passport');
const controller = require('../controllers/category');
const router = express.Router();


router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllCategory);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getCategory);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removeCategory);
router.post('/', passport.authenticate('jwt', {session: false}), controller.addCategory);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.editCategory);

module.exports = router;