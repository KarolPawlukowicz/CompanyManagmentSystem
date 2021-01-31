const express = require('express');
const router = express.Router();
const controller = require('../controller/part');

// GETs
router.get('/new', controller.newPartRender);
router.get('/edit/:id', controller.editByIdPartRender);
router.get('/:id', controller.readMoreByIdPartRender);
router.get('/', controller.allPartsRender);

// POST
router.post('/', controller.create);
// PUT
router.put('/:id', controller.update);
// DELETE
router.delete('/:id', controller.delete);

module.exports = router