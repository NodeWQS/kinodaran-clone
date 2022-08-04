const path = require('path');

module.exports.getInfo = function(original) {
    return {
        name: `${Date.now()}${original}`,
        filePath() {
            return path.join(path.dirname(__dirname, `uploads/${this.name}`));
        }
    };
};
