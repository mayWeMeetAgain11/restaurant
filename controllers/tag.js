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