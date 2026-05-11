const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(helmet());


app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))

}

// Main Routes

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ActiveUnity API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/users", userRoutes);


app.use(notFound);
app.use(errorHandler);

module.exports = app;