import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import cartRouter from "./routes/cart.routes.js";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/cart", cartRouter);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync().then(() => {
      console.log("Connected to database.");
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    });
  } catch (err) {
    console.error("Error connecting to database: ", err.message);
  }
};

startServer();

// sequelize.sync({ alter: true }).then(() => {
//   console.log("Database connected");

//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });
