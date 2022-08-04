const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, unique: true, length: 30, trim: true },
    password: String,
    name: { type: String, trim: true },
    lastname: { type: String, trim: true },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('user', userSchema);
