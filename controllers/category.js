const { Category, Item, Tag, Ingredient, Photo } = require('../models');


exports.getCategory = async (req, res, next) => {
    try {
        const category = await Category.findAll({
            include: [
                {
                    model: Category,
                    as: 'categories',
                    include: [
                        {
                            model: Item,
                            include: [
                                {
                                    model: Tag
                                }, {
                                    model: Ingredient
                                }, {
                                    model: Photo
                                }
                            ]
                        }
                    ]
                },
            ]
        });
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


exports.storeCategory = async (req, res, next) => {
    const { name, category_id } = req.body;
    try {
        const category = await Category.create({
            name: name,
            category_id: category_id || null,
        });
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};