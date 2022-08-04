const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: { type: String, length: 50, unique: true, trim: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('category', categorySchema);
