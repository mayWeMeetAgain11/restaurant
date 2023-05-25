const { Item, Photo, Ingredient, Tag } = require('../models'); 
const {Op} = require('sequelize');

exports.storeItem = async (req, res, next) => { 
    const {itemTags, name, details, cost, active, itemIngredients, category_id} = req.body;
    try { 
        const item = await Item.create({ 
            name: name,
            details: details,
            cost: cost,
            active: active || false,
            category_id: category_id
        });
        const tags = await Tag.findAll({
            where: {
                id: {
                    [Op.in] : itemTags
                }
            }
        });
        const ingredients = await Ingredient.findAll({
            where: {
                id: {
                    [Op.in] : itemIngredients
                }
            }
        });
        if (req.files) {
            for(let i = 0; i < req.files.length; i++) {
                // console.log(req.files[i]);
                await Photo.create({
                    image: req.files[i].path,
                    item_id: item.id
                });
            }
        }
        console.log("5");
        const addedTags = await item.addTags(tags);
        console.log("6");
        const addedIngredients = await item.addIngredients(ingredients);
        console.log("7");
        return res.status(200).json(item); 
    } catch (error) { 
        return res.status(500).json(error); 
    } 
};