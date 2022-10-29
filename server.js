const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { config } = require('dotenv');
const { connect } = require('mongoose');
const fs = require('fs/promises');
const path = require('path');

config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(fileUpload({ limits: { fileSize: 15728640 }, abortOnLimit: true }));
app.use('/movie', require('./movie/movie.router'));
app.use('/photo', require('./photo/photo.router'));
app.use('/category', require('./category/category.router'));
app.use('/auth', require('./auth/auth.router'));

(async () => {
    try {
        await connect(process.env.LINK, { useNewUrlParser: true });
    } catch (error) {
        console.log(error.message);
        process.exit(0);
    }
})();


const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`server work in port ${port}`);
});
