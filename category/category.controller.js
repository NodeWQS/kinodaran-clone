const Category = require('../models/category');

module.exports = class CategoryController {
    static async create(req, res) {
        try {
            const category = new Category({ ...req.body });
            await category.save();

            return res.status(201).json(category);
        } catch (error) {
            return res.status(403).json({ msg: 'category with this name is added.' });
        }
    }
    static async read(req, res) {
        try {
            const categories = await Category.find({});

            return res.status(200).json(categories);
        } catch (error) {
            return res.status(502).json({ msg: 'problem with server.' });
        }
    }
    static async update(req, res) {
        try {
            const category = await Category.findByIdAndUpdate(req.params.id, { ...req.body },
                { new: true });

            return res.status(200).json(category);
        } catch (error) {
            return res.status(403).json({ msg: 'category with this name is added.' });
        }
    }
    static async delete(req, res) {
        try {
            const category = await Category.findByIdAndDelete(req.params.id, { new: true });

            return res.status(200).json(category);
        } catch (error) {
            return res.status(404).json({ msg: 'category not found.' });
        }
    }
};
