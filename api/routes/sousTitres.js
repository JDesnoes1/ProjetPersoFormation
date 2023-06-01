import Express from "express";
import {
  insertSousTitre,
  updateSousTitre,
  deleteSousTitre,
  getStByModId,
} from "../controllers/sousTitre.js";

const router = Express.Router();

router.post("/:moduleId", insertSousTitre);
router.put("/", updateSousTitre);
router.delete("/", deleteSousTitre);
router.get("/:moduleId", getStByModId);

export default router;
