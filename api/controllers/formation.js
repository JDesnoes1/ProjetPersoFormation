import { db } from "../db.js";

export const getFormation = (req, res) => {
  const formationId = req.params.formationId;
  const q = "SELECT * FROM formations WHERE id = ?";
  db.query(q, [formationId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data[0]);
  });
};
