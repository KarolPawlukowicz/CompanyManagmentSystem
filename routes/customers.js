const express = require('express');
const router = express.Router();
const controller = require('../controller/customer');

var authenticate = require('../middleware/authenticate');

// GETs
router.get('/new', controller.newCustomerRender);
router.get('/edit/:id', controller.editByIdCustomerRender);
router.get('/:id', controller.readMoreByIdCustomerRender);
router.get('/',authenticate, controller.allCustomersRender);





// POST
router.post('/', controller.create);
// PUT
router.put('/:id', controller.update);
// DELETE
router.delete('/:id', controller.delete);

module.exports = router