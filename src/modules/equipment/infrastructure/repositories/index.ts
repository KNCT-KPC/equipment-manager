import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

// ルートパスへのリクエスト
app.get("/", (req, res) => {
  res.send("Server is running");
});

// リッスンするポートの設定
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});