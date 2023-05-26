import Express from "express";
import {
  getModulesByIdFormation,
  getModuleById,
} from "../controllers/module.js";

const router = Express.Router();

router.get("/:formationId", getModulesByIdFormation);
router.get("/mod/:moduleId", getModuleById);

export default router;
