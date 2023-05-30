import Express from "express";
import {
  insertParagraphe,
  updateParagraphe,
} from "../controllers/paragraphe.js";

const router = Express.Router();

router.post("/:moduleId", insertParagraphe);
router.put("/", updateParagraphe);

export default router;
