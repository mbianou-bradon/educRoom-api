import Express from "express";
import { authRoutes, courseRoutes } from "./routes";
import mongoose from "mongoose";
import cors from "cors";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./vars/.env" });
}

const app = Express();
const PORT = process.env.PORT;
const DB_URI = process.env.MONGODB_URI!;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB Database");
    app.listen(PORT, () => {
      console.log("Listening at Port", PORT);
    });
    // uploadData();
  })
  .catch((error) => {
    console.log("MongoDB error:", error);
  });

// Middlewares
app.use(Express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(
  cors({
    origin: [
      "http://127.0.0.1:3000",
      "https://attendly-web-dashboard.vercel.app",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

// Defining Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
