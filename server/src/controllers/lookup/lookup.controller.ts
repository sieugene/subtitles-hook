import { Request, Response } from "express";
import { Dictionary } from "../../services";
import { Kuromoji } from "../../services/Kuromoji";
import { LookupResponse } from "./types";

export const LookupController = (
  req: Request,
  res: Response<LookupResponse>,
  kuromojiService: Kuromoji,
  dictionaryService: Dictionary
) => {
  const sentence = req.query.sentence as string;
  if (!sentence || !kuromojiService.tokenizer) {
    res.status(400).json({
      error: "The offer is not specified or the tokenizer is not ready",
    });
    return;
  }
  const tokens = kuromojiService.tokenizer.tokenize(sentence);
  const surfaceForms = tokens.map((token) => token.surface_form);
  const words = tokens.map((token) => token.basic_form);
  const searchByFirstSymbol = words.map((w) => w[0]);
  const variants = [...surfaceForms, ...words, ...searchByFirstSymbol];

  const dictionaryResult = dictionaryService.find(variants);
  res.json({ data: { dictionaryResult, words, tokens } });
};
