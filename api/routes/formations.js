import Express from "express";
import { getFormation } from "../controllers/formation.js";

const router = Express.Router();

router.get("/find/:formationId", getFormation);

export default router;
