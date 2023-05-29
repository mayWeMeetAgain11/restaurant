const { Category, Item, Tag, Ingredient, Photo } = require('../models');


exports.getCategory = async (req, res, next) => {
    const { language } = req.query;
    try {
        const category = await Category.findAll({
            attributes: ['id', `name_${language}`, 'createdAt', 'updatedAt'],
            include: [
                {
                    model: Category,
                    as: 'categories',
                    attributes: ['id', `name_${language}`, 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: Item,
                            attributes: ['id', `name_${language}`, `details_${language}`, 'cost', 'createdAt', 'updatedAt'],
                            include: [
                                {
                                    model: Tag,
                                    attributes: ['id', `name_${language}`, 'createdAt', 'updatedAt'],
                                }, {
                                    model: Ingredient,
                                    attributes: ['id', `name_${language}`, 'createdAt', 'updatedAt'],
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
    const { name_ar, name_en, name_dw, category_id } = req.body;
    try {
        const category = await Category.create({
            name_ar: name_ar,
            name_en: name_en,
            name_dw: name_dw,
            category_id: category_id || null,
        });
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.updateCategory = async (req, res, next) => {
    const { name_ar, name_en, name_dw, category_id } = req.body;
    const { id } = req.params;
    try {
        const category = await Category.findOne({
            where: {
                id: id,
            }
        });
        if (!category) {
            return res.status(404).json({ message: 'category not found' });
        }
        category.name_ar = name_ar;
        category.name_en = name_en;
        category.name_dw = name_dw;
        category.category_id = category_id;
        category.save();
        return res.status(200).json({ message: 'category updated successfully' });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.deleteCategory = async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await Category.findOne({
            where: {
                id: id,
            }
        });
        if (!category) {
            return res.status(404).json({ message: 'category not found' });
        }
        await category.destroy();
        return res.status(200).json({ message: 'category deleted successfully' });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};