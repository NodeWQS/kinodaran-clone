const User = require('../models/user');
const { hash, compare } = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');

module.exports = class AuthController {
    static async signup(req, res) {
        try {
            const password = await hash(req.body.password.toLowerCase(), 10);
            const user = new User({ ...req.body, password });
            await user.save();

            return res.status(201).json(user);
        } catch (error) {
            return res.status(403).json({ msg: 'user with this email is registred.' });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            const compariation = await compare(password, user.password);

            if (user && compariation) {
                const token = sign({ ...user }, process.env.TOKEN, { expiresIn: 864000 });

                return res.status(200).json({ token });
            }
            throw new Error();
        } catch (error) {
            return res.status(401).json({ msg: 'email or password not correct.' });
        }
    }
    static verification(req, res) {
        try {
            const data = verify(req.body.token, process.env.TOKEN);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ msg: 'token not found.' });
        }
    }
};
