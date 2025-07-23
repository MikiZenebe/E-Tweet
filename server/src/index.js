import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import foodRoute from "./routes/FoodRoutes.js";
import orderRoute from "./routes/OrderRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//routes
app.use("/menu", foodRoute);
app.use("/order", orderRoute);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
