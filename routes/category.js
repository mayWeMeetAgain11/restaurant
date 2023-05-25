const express = require('express');

const router = express.Router();

const { getCategory, storeCategory, updateCategory, deleteCategory } = require('../controllers/category');

router.get('/', getCategory);

router.post('/', storeCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);


module.exports = router;