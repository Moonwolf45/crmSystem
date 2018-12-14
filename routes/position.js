const express = require('express');
const controller = require('../controllers/position');
const router = express.Router();


router.get('/:category', controller.getAllPositionCategory);
router.post('/', controller.addPosition);
router.patch('/:id', controller.editPosition);
router.delete('/:id', controller.deletePosition);

module.exports = router;