import Express from "express";
import {
  insertParagraphe,
  updateParagraphe,
  deleteParagraphe,
} from "../controllers/paragraphe.js";

const router = Express.Router();

router.post("/:moduleId", insertParagraphe);
router.put("/", updateParagraphe);
router.delete("/", deleteParagraphe);

export default router;
