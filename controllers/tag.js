const { Tag } = require('../models'); 

exports.storeTag = async (req, res, next) => { 
    const {name} = req.body;
    try { 
        const tag = await Tag.create({ 
            name: name
        }); 
        return res.status(200).json(tag); 
    } catch (error) { 
        return res.status(500).json(error); 
    } 
};

exports.getAllTags = async (req, res, next) => {
    try { 
        const tag = await Tag.findAll({}); 
        return res.status(200).json(tag); 
    } catch (error) { 
        return res.status(500).json(error); 
    } 
};

exports.deleteTag = async (req, res, next) => {
    let { id } = req.params;
    try {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(403).json({massage: 'tag not found'});
        }
        tag.destroy();
        return res.status(200).json({massage: 'tag deleted sucessfully'});
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.updateTag = async (req, res, next) => {
    let { id } = req.params;
    let {name} = req.body;
    try {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(403).json({massage: 'tag not found'});
        }
        tag.name = name;
        tag.save();
        return res.status(200).json({massage: 'tag updated sucessfully'});
    } catch (error) {
        return res.status(500).json(error);
    }
};