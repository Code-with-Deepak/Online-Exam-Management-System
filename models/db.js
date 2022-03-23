var mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {

    mongoose.connect("mongodb://localhost:27017/EMS", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Successfully connected to database");
      })
      .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
  };