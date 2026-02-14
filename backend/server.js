const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {connectDB,getDB} = require("./config/database");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to Database
connectDB();

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "MERN E-Commerce API is running!",
    status: "success",
  });
});

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
