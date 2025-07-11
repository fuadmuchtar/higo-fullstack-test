const express = require('express');
const CustomerController = require('../controllers/customerController');
const router = express.Router();


router.get('/customers', CustomerController.getCustomers);
router.get('/overview', CustomerController.getSummarizeData);


module.exports = router;
