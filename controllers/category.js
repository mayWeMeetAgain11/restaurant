const { Category, Item, Tag, Ingredient, Photo } = require('../models');


exports.getCategory = async (req, res, next) => {
    const { language } = req.query;
    try {
        const category = await Category.findAll({
            attributes: ['id', [`name_${language}`, "name"], 'createdAt', 'updatedAt', 'image'],
            include: [
                // {
                //     model: Category,
                //     as: 'categories',
                //     attributes: ['id', [`name_${language}`, "name"], 'createdAt', 'updatedAt'],
                //     hierarchy: true,
                //     include: [
                //         {
                //             model: Item,
                //             attributes: ['id', [`name_${language}`, "name"], [`details_${language}`, "details"], 'cost', 'createdAt', 'updatedAt'],
                //             include: [
                //                 {
                //                     model: Tag,
                //                     attributes: ['id', [`name_${language}`, "name"], 'createdAt', 'updatedAt'],
                //                 }, {
                //                     model: Ingredient,
                //                     attributes: ['id', [`name_${language}`, "name"], 'createdAt', 'updatedAt'],
                //                 }, {
                //                     model: Photo
                //                 }
                //             ]
                //         }
                //     ]
                // },
                {
                    model: Item,
                    attributes: ['id', [`name_${language}`, "name"], [`details_${language}`, "details"], 'cost', 'active', 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: Tag,
                            attributes: ['id', [`name_${language}`, "name"], 'createdAt', 'updatedAt'],
                        }, {
                            model: Ingredient,
                            attributes: ['id', [`name_${language}`, "name"], 'createdAt', 'updatedAt'],
                        }, {
                            model: Photo
                        }
                    ]
                }
            ],
            // where: {
            //     category_id: null,
            // }
        });
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


exports.storeCategory = async (req, res, next) => {
    const { name_ar, name_en, name_dw } = req.body;
    try {
        const rootCategory = await Category.findOne({
            where: {
                id: category_id
            }
        });
        if (rootCategory.category_id !== null)  {
            return res.status(401).json({msg: "you can not add more than two level in category"});
        }
        const category = await Category.create({
            name_ar: name_ar,
            name_en: name_en,
            name_dw: name_dw,
            image: req.file.path || null,
        });
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.updateCategory = async (req, res, next) => {
    const { name_ar, name_en, name_dw } = req.body;
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
        await category.save();
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