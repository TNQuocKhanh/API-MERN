require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const mongoString = process.env.DATABASE_URL;
const PORT = 3000;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
