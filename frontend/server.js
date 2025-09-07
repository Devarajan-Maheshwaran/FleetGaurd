import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 5173;
app.listen(PORT, ()=> console.log(`Frontend served at http://localhost:${PORT}`));
