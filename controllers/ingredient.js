const { Ingredient } = require('../models');

exports.getAllIngredients = async (req, res, next) => {
    try { 
        const ingredients = await Ingredient.findAll({});
        return res.status(200).json(ingredients); 
    } catch (error) { 
        return res.status(500).json(error); 
    } 
};

exports.storeIngredient = async (req, res, next) => { 
    const {name} = req.body;
    try { 
        const ingredient = await Ingredient.create({ 
            name: name
        }); 
        return res.status(200).json(ingredient); 
    } catch (error) { 
        return res.status(500).json(error); 
    } 
};