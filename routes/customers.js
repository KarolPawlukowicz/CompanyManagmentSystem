const express = require('express');
const router = express.Router();
const controller = require('../controller/customer');

var authenticate = require('../middleware/authenticate');

// GETs
router.get('/new',authenticate, controller.newCustomerRender);
router.get('/edit/:id',authenticate, controller.editByIdCustomerRender);
router.get('/:id',authenticate, controller.readMoreByIdCustomerRender);
router.get('/',authenticate, controller.allCustomersRender);



// POST
router.post('/',authenticate, controller.create);
// PUT
router.put('/:id',authenticate, controller.update);
// DELETE
router.delete('/:id',authenticate, controller.delete);

module.exports = router