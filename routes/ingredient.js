const express = require('express');

const router = express.Router();

const ingredient = require('../controllers/ingredient');

router.get('/', ingredient.getAllIngredients);

router.post('/', ingredient.storeIngredient);

module.exports = router