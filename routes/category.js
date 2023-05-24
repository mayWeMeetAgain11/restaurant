const express = require('express');

const router = express.Router();

const { getCategory, storeCategory } = require('../controllers/category');

router.get('/', getCategory);
router.post('/', storeCategory);


module.exports = router;