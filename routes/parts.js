const express = require('express');
const router = express.Router();
const controller = require('../controller/part');

var authenticate = require('../middleware/authenticate');

// GETs
router.get('/new',authenticate, controller.newPartRender);
router.get('/edit/:id',authenticate, controller.editByIdPartRender);
router.get('/:id',authenticate, controller.readMoreByIdPartRender);
router.get('/', controller.allPartsRender);

// POST
router.post('/',authenticate, controller.create);
// PUT
router.put('/:id',authenticate, controller.update);
// DELETE
router.delete('/:id',authenticate, controller.delete);

module.exports = router