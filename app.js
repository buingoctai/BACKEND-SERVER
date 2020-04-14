const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
const AppError = require("./utils/appError");
// Create app and integrate with many middleware
const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(helmet()); // Set security HTTP headers
app.use(express.json());
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: "Qúa nhiều yêu cầu cho chức năng này. Vui lòng thử lại khi khác!",
});
app.use("/api", limiter); // Limit request from the same API

// Routes
// User
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/blog", blogRoutes);
// Blog
app.use("*", (req, res, next) => {
  console.log("URL SAI");
  const err = new AppError(404, "fail", "undefined route");
  res.send(err);
});

module.exports = app;
