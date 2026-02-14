const { MongoClient } = require("mongodb");

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    
    await client.connect();
    
    db = client.db();
    
    // Verify connection
    await db.admin().ping();
    
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
