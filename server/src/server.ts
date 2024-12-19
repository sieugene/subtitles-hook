import express from "express";
import { App } from "./app";
import { TokenizeRouter } from "./routes/tokenize.routes";
import { Dictionary, Kuromoji } from "./services";
import { EnDictionaryLookup } from "./services/Dictionary/model/Dictionary.en";
import { RuDictionaryLookup } from "./services/Dictionary/model/Dictionary.ru";

// Init
const app = new App(express(), 3000);

// Services
const KuromojiService = new Kuromoji();
const DictionaryService = new Dictionary([
  EnDictionaryLookup,
  RuDictionaryLookup,
]);

// Routes
const tokenizeRouter = TokenizeRouter(KuromojiService, DictionaryService);
app.root.use("/v1/tokenizer", tokenizeRouter);

// Run
app.run();
