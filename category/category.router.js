const router = require('express').Router();
const controller = require('./category.controller');

router.get('/', controller.read);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
