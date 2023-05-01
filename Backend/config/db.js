const mongoose = require("mongoose");
require("dotenv").config()

const dbConnection = mongoose.connect(process.env.mongo_URL);

module.exports = {dbConnection}