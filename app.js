const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const userRoutes = require("./routes/userRoutes");
const AppError = require("./utils/appError");
// Create app and integrate with many middleware
const app = express();
app.use(cors()); // All Cross-Origin request
app.use(helmet()); // Set security HTTP headers
app.use(express.json());
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: "Qúa nhiều yêu cầu cho chức năng này. Vui lòng thử lại khi khác!"
});
app.use("/api", limiter); // Limit request from the same API

// Routes
// User
app.use("/user/", userRoutes);
// Blog
app.use("*", (req, res, next) => {
  console.log("URL SAI");
  const err = new AppError(404, "fail", "undefined route");
  res.send(err);
});

module.exports = app;
