import { Router } from "express";
import { LookupController } from "../controllers/lookup/lookup.controller";
import { Kuromoji } from "../services/Kuromoji";
import { Dictionary } from "../services";

export const TokenizeRouter = (
  service: Kuromoji,
  dictionaryService: Dictionary
) => {
  const router = Router();
  router.get("/lookup", (req, res) =>
    LookupController(req, res, service, dictionaryService)
  );
  return router;
};
