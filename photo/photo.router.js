const router = require('express').Router();
const controller = require('./photo.controller');

router.get('/:name', controller.getAvatar);
router.delete('/:name', controller.deleteAvatar);

module.exports = router;
