import Express from "express";
import { insertSousTitre } from "../controllers/sousTitre.js";

const router = Express.Router();

router.post("/:moduleId", insertSousTitre);

export default router;
