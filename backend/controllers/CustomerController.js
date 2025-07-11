const CustomerModel = require('../models/CustomerModel')

class CustomerController {
    static async getCustomers(req, res) {
        try {
            const data = await CustomerModel.getCustomers(req.query)
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error"})
        }
    }

    static async getTotalGender(req, res) {
        try {
            const data = await CustomerModel.getGenders()
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    }
}

module.exports = CustomerController