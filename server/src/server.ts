import express from "express";
import kuromoji from "kuromoji";
import path from "path";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const port = 3000;

const dicPath = path.join(__dirname, "../dict");

let tokenizer: kuromoji.Tokenizer<kuromoji.IpadicFeatures> | null = null;
kuromoji.builder({ dicPath }).build((err, builtTokenizer) => {
  if (err) {
    console.error("Tokenizer construction error:", err);
    return;
  }
  tokenizer = builtTokenizer;
});

app.get("/tokenize", (req, res) => {
  const sentence = req.query.sentence as string;
  if (!sentence || !tokenizer) {
    res.status(400).json({
      error: "The offer is not specified or the tokenizer is not ready",
    });
    return;
  }

  const tokens = tokenizer.tokenize(sentence);
  res.json(tokens);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
