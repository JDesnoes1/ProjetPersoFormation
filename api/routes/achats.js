import Express from "express";
import { getAchat } from "../controllers/achat.js";

const router = Express.Router();

router.get("/", getAchat);

export default router;
