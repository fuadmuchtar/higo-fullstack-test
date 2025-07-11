if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', customerRoutes);

module.exports = app;
