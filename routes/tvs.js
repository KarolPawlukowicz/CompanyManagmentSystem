const express = require('express');
const router = express.Router();
const controller = require('../controller/tv');

var authenticate = require('../middleware/authenticate');

// GETs
router.get('/new',authenticate, controller.newTvRender);
router.get('/edit/:id',authenticate, controller.editByIdTvRender);
router.get('/:id',authenticate, controller.readMoreByIdTvRender);
router.get('/', controller.allTvsRender);

// POST
router.post('/',authenticate, controller.create);
// PUT
router.put('/:id',authenticate, controller.update);
// DELETE
router.delete('/:id',authenticate, controller.delete);

module.exports = router