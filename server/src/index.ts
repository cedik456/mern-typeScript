import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();

const app = express();

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://daily-ink.vercel.app"]
    : ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you need cookies
  })
);

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URL is not defined in .env");
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Connection
connectDB(MONGODB_URI);

// Routes
app.use("/api/todos/", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
