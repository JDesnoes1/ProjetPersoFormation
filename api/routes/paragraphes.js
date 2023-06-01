import Express from "express";
import {
  insertParagraphe,
  updateParagraphe,
  deleteParagraphe,
  getParagraphesByModId,
} from "../controllers/paragraphe.js";

const router = Express.Router();

router.post("/:moduleId", insertParagraphe);
router.put("/", updateParagraphe);
router.delete("/", deleteParagraphe);
router.get("/:moduleId", getParagraphesByModId);

export default router;
