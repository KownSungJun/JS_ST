import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const DATA_FILE = path.join("data", "flashcards.json");

// JSON 저장 API
app.post("/save", (req, res) => {
  fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).send("파일 저장 실패");
    res.send("저장 완료");
  });
});

// JSON 불러오기 API
app.get("/load", (req, res) => {
  if (!fs.existsSync(DATA_FILE)) return res.json({ cards: [] });
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  res.json(JSON.parse(data));
});

app.use(express.static(".")); // index.html 제공

app.listen(3000, () => console.log("서버 실행: http://localhost:3000"));
