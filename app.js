const express = require("express");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const searchRoutes = require("./routes/search");
const pageRoutes = require("./routes/page")
const userRouter = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const reviewRoutes = require("./routes/reviews")
const inventryRoutes = require("./routes/Inventory")
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use('/api/users', userRouter);


app.use('/api', searchRoutes);
app.use('/api', pageRoutes);
app.use('/api', productRoutes);
app.use('/api', reviewRoutes);
app.use('/api', inventryRoutes);



app.use(errorHandler);

module.exports = app;
