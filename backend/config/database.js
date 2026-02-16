const mongoose = require("mongoose");

let db;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    db = mongoose.connection;
    
    console.log(`MongoDB Connected Successfully`);
    console.log(`Database Name: ${db.name}`);
    
    return db;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
