const express = require('express');
const Customer = require('../models/customer');
const router = express.Router();
const controller = require('../controller/customer');

const axios = require('axios')

// GETs
//router.get('/:status', controller.allCustomersRender);


//router.get('/sorted', controller.sortedCustomersRender);
router.get('/new', controller.newCustomerRender);
router.get('/edit/:id', controller.editByIdCustomerRender);
router.get('/:id', controller.readMoreByIdCustomerRender);


router.get('/', controller.allCustomersRender);





// POST
router.post('/', controller.create);
// PUT
router.put('/:id', controller.update);
// DELETE
router.delete('/:id', controller.delete);

module.exports = router