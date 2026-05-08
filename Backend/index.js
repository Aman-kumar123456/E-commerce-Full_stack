import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";
import uploadimageRouter from "./routes/uploadimage.route.js";
import categoryRouter from "./routes/category.route.js";
import subcategoryRouter from "./routes/subcategory.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import addressRouter from "./routes/address.route.js";
import orderRoute from "./routes/order.route.js";

import { webhookStripe } from "./controllers/order.controller.js";
const app = express();

app.post("/api/order/webhook", webhookStripe);
app.use(
  cors({
    origin: process.env.FRONT_END,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

// const PORT = 5000 || process.env.PORT;

// app.get("/",(req,res)=>{
//     res.send("Hello World");
// })
app.get("/", (req, res) => {
  res.send("Hello World is here --------------------" + PORT);
});

app.use("/api/user", userRouter);
app.use("/api/upload", uploadimageRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subcategory", subcategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRoute);


connectDB();

export default app;
