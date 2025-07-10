const express = require('express')
const router = express.Router()

router.use('/customers', require('./customer'))

module.exports = router
