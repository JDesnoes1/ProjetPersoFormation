import Express from "express";
import {
  insertSousTitre,
  updateSousTitre,
  deleteSousTitre,
} from "../controllers/sousTitre.js";

const router = Express.Router();

router.post("/:moduleId", insertSousTitre);
router.put("/", updateSousTitre);
router.delete("/", deleteSousTitre);

export default router;
