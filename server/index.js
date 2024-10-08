const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ideamgix-lectue-scheduler-xofv.vercel.app/",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
    process.exit(1); // Terminate the application on connection failure
  });

// Routes
app.use("/api/auth", authRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Server is running; you are seeing this on the deployed server",
  });
});

// Server configuration
const port = process.env.PORT || 8000;
const host = process.env.HOST || "0.0.0.0";

app.listen(port, host, () => {
  console.log(`Server started on port ${port}`);
});
