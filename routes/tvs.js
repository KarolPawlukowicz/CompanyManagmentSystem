const express = require('express');
const router = express.Router();
const controller = require('../controller/tv');

// GETs
router.get('/new', controller.newTvRender);
router.get('/edit/:id', controller.editByIdTvRender);
router.get('/:id', controller.readMoreByIdTvRender);
router.get('/', controller.allTvsRender);

// POST
router.post('/', controller.create);
// PUT
router.put('/:id', controller.update);
// DELETE
router.delete('/:id', controller.delete);

module.exports = router