const express = require('express');
const controller = require('../controllers/category');
const router = express.Router();


router.get('/', controller.getAllCategory);
router.get('/:id', controller.getCategory);
router.delete('/:id', controller.removeCategory);
router.post('/', controller.addCategory);
router.patch('/:id', controller.editCategory);

module.exports = router;