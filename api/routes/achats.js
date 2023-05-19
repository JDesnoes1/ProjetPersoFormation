import Express from "express";
import { addAchat, getAchat, getAllAchats } from "../controllers/achat.js";

const router = Express.Router();

router.get("/", getAchat);
router.post("/", addAchat);
router.get("/allAchats", getAllAchats);

export default router;
