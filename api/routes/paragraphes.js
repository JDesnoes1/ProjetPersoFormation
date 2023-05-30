import Express from "express";
import { insertParagraphe } from "../controllers/paragraphe.js";

const router = Express.Router();

router.post("/:moduleId", insertParagraphe);

export default router;
