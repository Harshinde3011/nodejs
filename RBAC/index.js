import "dotenv/config";
import express from "express";
import { connectDb } from "./src/config/db.js";
import apiRoutes from "./src/routes/index.js";

const app = express();

app.use(express.json());
app.use("/api", apiRoutes);

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "RBAC API running" });
});

const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
