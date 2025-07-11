const express = require('express')
const customer = express.Router()

const CustomerController = require('../controllers/CustomerController')

customer.get('/', CustomerController.getCustomers)
customer.get('/genders', CustomerController.getTotalGender)

module.exports = customer
