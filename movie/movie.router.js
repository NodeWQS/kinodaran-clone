const router = require('express').Router();
const controller = require('./movie.controller');

router.get('/', controller.read);
router.get('/:id', controller.getMovie);
router.get('/category/:categoryId', controller.getByCategory);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/change/:id', controller.changeAvatar);
router.delete('/:id', controller.delete);

module.exports = router;
