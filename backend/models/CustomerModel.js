const db = require('../config/db')

class CustomerModel {
    static collection() {
        return db.collection("Customers")
    }

    // static async getCustomers() {
    //     try {
    //         const data = await this.collection().find().skip(0).limit(10).toArray()
            
    //         return data
    //     } catch (error) {
    //         throw (error)
    //     }
    // }

    static async getCustomers({ page, search = "" }) {

        const limit = 10
        const skip = limit * (+page - 1)

        const arrQueryName = search
            .trim().split(" ")
            .map((str) => ({ Name: { $regex: str, $options: "i" } }))

        const data = await this.collection().find({
            $and: arrQueryName
        }).skip(skip).limit(limit).toArray()

        const totalData = await this.collection().countDocuments( {}, { hint: "_id_"} )

        return {
            data,
            totalData
        }
    }

    static async getGenders() {
        try {
            const data = await this.collection().aggregate([
                {
                    $group: {
                        _id: "$gender",
                        total: { $sum: 1 }
                    }
                }
            ]).toArray()

            return data
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = CustomerModel