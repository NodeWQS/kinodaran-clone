const fs = require('fs/promises');
const path = require('path');

module.exports = class PhotoController {
    static getAvatar(req, res) {
        try {
            const { name } = req.params;
            const photoPath = path.join(path.dirname(__dirname), `uploads/${name}`);

            return res.status(200).sendFile(photoPath);
        } catch (error) {
            return res.status(404).json({ msg: 'photo not found.' });
        }
    }
    static async deleteAvatar(req, res) {
        try {
            const { name } = req.params;
            const photoPath = path.join(path.dirname(__dirname), `uploads/${name}`);

            await fs.unlink(photoPath);
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(404).json({ success: false });
        }
    }
};
