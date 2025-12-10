import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();
// Resolve to the directory of this file (not the process CWD)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load env one level above backend (project root: ../.. from src)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
  // frontend lives alongside backend, so from src go up two levels
  const distPath = path.resolve(__dirname, "../../frontend/dist");
  app.use(express.static(distPath));
  console.log("Serving frontend from:", distPath);
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));