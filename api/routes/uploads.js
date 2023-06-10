import Express, { application } from "express";
import { upload } from "../controllers/upload.js";

const router = Express.Router();

router.post("/", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

export default router;
