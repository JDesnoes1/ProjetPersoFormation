import Express from "express";
import { addAchat, getAchat } from "../controllers/achat.js";

const router = Express.Router();

router.get("/", getAchat);
router.post("/", addAchat);

export default router;
