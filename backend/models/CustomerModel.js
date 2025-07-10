const db = require('../config/db')

class CustomerModel {
    static collection() {
        return db.collection("Customers")
    }

    static async getCustomers() {
        try {
            const data = await this.collection().find().skip(0).limit(10).toArray()
            return data
        } catch (error) {
            throw(error)
        }
    }
}

module.exports = CustomerModel