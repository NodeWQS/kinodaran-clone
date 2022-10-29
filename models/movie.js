const { Schema, model } = require('mongoose');

const kinoSchema = new Schema({
    title: { type: String, length: 150, unique: true, trim: true },
    description: String,
    photo: String,
    trailer: { type: String, unique: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    year: { type: Number, default: 2000 },
    budget: { type: Number, default: 0 },
    director: String,
    producer: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('movie', kinoSchema);
