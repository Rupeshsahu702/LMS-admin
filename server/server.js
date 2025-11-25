import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import apiRoutes from "./routes/api/index.js";
import "./config/passport.js";
import connectCloudinary from "./config/cloudinary.js";

// --- Config ---
const app = express();
const PORT = process.env.PORT || 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Database Connection ---
connectDB();
connectCloudinary();

// --- Middlewares ---
app.use(cors()); // Enable CORS
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: false })); // Body parser for forms

// --- Static Folders ---
// This serves the 'uploads' folder publicly
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// --- API Routes ---
app.use("/api", apiRoutes);

// --- Basic Server Listen ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
