const Movie = require('../models/movie');
const { getInfo } = require('./movie.service');
const fs = require('fs/promises');
const axios = require('axios').default;

module.exports = class MovieController {
    static async create(req, res) {
        try {
            const { photo } = req.files;
            const { name, filePath } = getInfo(photo.name);
            const movie = new Movie({
                ...req.body,
                photo: `${process.env.HOST}/photo/${name}`
            });
            await movie.save();
            await fs.writeFile(filePath, photo.data);

            return res.status(201).json(movie);
        } catch (error) {
            return res.status(403).json({ msg: 'movie with this title is added.' });
        }
    }
    static async read(req, res) {
        try {
            const page = req.query.page || 1;
            const limitCount = req.query.limit || 10;
            const movies = await Movie.find({}).limit(page * limitCount)
                .skip((page - 1) * limitCount);
            return res.status(200).json({ movies });
        } catch (error) {
            return res.status(502).json({ msg: 'problem with server.' });
        }
    }
    static async update(req, res) {
        try {
            const movie = await Movie.findByIdAndUpdate(req.params.id, {
                ...req.body
            }, { new: true });

            return res.status(200).json(movie);
        } catch (error) {
            return res.status(403).json({ msg: 'python.' });
        }
    }
    static async delete(req, res) {
        try {
            const movie = await Movie.findByIdAndDelete(req.params.id, { new: true });
            const response = await axios.delete(movie.photo);

            if (response.status === 200) {
                return res.status(200).json(movie);
            }
            throw new Error();
        } catch (error) {
            return res.status(404).json({ msg: 'movie not found.' });
        }
    }
    static async getMovie(req, res) {
        try {
            const movie = await Movie.findById(req.params.id);

            return res.status(200).json(movie);
        } catch (error) {
            return res.status(404).json({ msg: 'movie not found.' });
        }
    }
    static async getByCategory(req, res) {
        try {
            const { categoryId } = req.params;
            const page = req.query.page || 1;
            const limitCount = req.query.limit || 10;
            const movies = await Movie.find({ category: categoryId }).limit(page * limitCount)
                .skip((page - 1) * limitCount);

            return res.status(200).json({ movies });
        } catch (error) {
            return res.status(404).json({ msg: 'movies not found.' });
        }
    }
    static async changeAvatar(req, res) {
        try {
            const { photo } = req.files;
            const { name, filePath } = getInfo(photo.name);
            const movie = await Movie.findByIdAndUpdate(req.params.id,
                {  photo: `${process.env.HOST}/photo/${name}` }, { returnOriginal: true });
            const response = await axios.delete(movie.photo);

            if (response.status === 200) {
                await fs.writeFile(filePath, photo.data);
                return res.status(200).json(movie);
            }
            throw new Error();
        } catch (error) {
            return res.status(404).json({ msg: 'problem with changing avatar.' });
        }
    }
};
