const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'higo_db';
const collectionName = 'Customers';

class CustomerController {
  static async getCustomers(req, res) {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;
      const search = req.query.search?.trim() || '';

      const filter = search
        ? {
            $or: [
              { Name: { $regex: search, $options: 'i' } },
              { Email: { $regex: search, $options: 'i' } },
              { "Brand Device": { $regex: search, $options: 'i' } },
              { "Name of Location": { $regex: search, $options: 'i' } }
            ]
          }
        : {};

      const [data, totalData] = await Promise.all([
        collection.find(filter).sort({ Date: -1 }).skip(skip).limit(limit).toArray(),
        collection.countDocuments(filter)
      ]);

      res.json({ data, totalData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getSummarizeData(req, res) {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      const baseGroupStage = [
        {
          $match: {
            Email: { $ne: null },
            gender: { $in: ["Male", "Female"] }
          }
        },
        {
          $group: {
            _id: "$Email",
            gender: { $first: "$gender" },
            location: { $first: "$Location Type" }
          }
        }
      ];

      const genderAgg = await db
        .collection(collectionName)
        .aggregate([
          ...baseGroupStage,
          {
            $group: {
              _id: "$gender",
              count: { $sum: 1 }
            }
          }
        ])
        .toArray();

      const locationAgg = await db
        .collection(collectionName)
        .aggregate([
          ...baseGroupStage,
          {
            $group: {
              _id: "$location",
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          }
        ])
        .toArray();

      const totalDataResult = await db
        .collection(collectionName)
        .aggregate([
          {
            $group: { _id: "$Email" }
          },
          {
            $count: "uniqueCustomers"
          }
        ])
        .toArray();

      const labels = locationAgg.map(item => item._id || 'Unknown');
      const values = locationAgg.map(item => item.count);

      const genderCount = genderAgg.reduce(
        (acc, curr) => {
          const key = (curr._id || 'unknown').toLowerCase();
          acc[key] = curr.count;
          return acc;
        },
        { male: 0, female: 0 }
      );

      const totalUser = totalDataResult[0]?.uniqueCustomers || 0;

      res.json({
        locationType: {
          labels,
          values,
          raw: locationAgg
        },
        genderCount,
        totalUser
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = CustomerController;
