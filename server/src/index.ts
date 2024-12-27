import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import financialRecordRouter from "./routes/financial-records";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = process.env.MONGODB_URI || "";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
