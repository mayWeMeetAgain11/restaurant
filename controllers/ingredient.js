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
exports.deleteIngredient = async (req, res, next) => {
    let { id } = req.params;
    try {
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            return res.status(403).json({massage: 'ingredient not found'});
        }
            ingredient.destroy();
            return res.status(200).json({massage: 'ingredient deleted sucessfully'});
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.updateIngredient = async (req, res, next) => {
    let { id } = req.params;
    let {name} = req.body;
    try {
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            return res.status(403).json({massage: 'ingredient not found'});
        }
            ingredient.name = name;
            ingredient.save();
            return res.status(200).json({massage: 'ingredient updated sucessfully'});
    } catch (error) {
        return res.status(500).json(error);
    }
};