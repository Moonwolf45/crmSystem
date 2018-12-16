const express = require('express');
const passport = require('passport');

const controller = require('../controllers/category');
const upload = require('../middleware/upload');
const router = express.Router();


router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllCategory);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getCategory);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removeCategory);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.addCategory);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.editCategory);

module.exports = router;