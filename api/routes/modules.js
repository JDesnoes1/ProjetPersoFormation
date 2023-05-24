import Express from "express";
import { getModulesByIdFormation } from "../controllers/module.js";

const router = Express.Router();

router.get("/:formationId", getModulesByIdFormation);

export default router;
