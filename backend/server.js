const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());

// Route Placeholders
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.use("/api/products", (req, res) => {
    res.json({ message: "Products route working" });
});

app.use("/api/ai", (req, res) => {
    res.json({ message: "AI route working" });
});

app.use("/api/dashboard", (req, res) => {
    res.json({ message: "Dashboard route working" });
});

// Root Route
app.get("/", (req, res) => {
    res.send("🚀 SmartStore AI Backend Running");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});