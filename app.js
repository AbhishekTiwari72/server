const express = require("express");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use(errorHandler);

module.exports = app;
