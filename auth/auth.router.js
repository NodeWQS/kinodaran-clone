const router = require('express').Router();
const controller = require('./auth.controller');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/verification', controller.verification);

module.exports = router;
