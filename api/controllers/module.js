import { db } from "../db.js";

export const getModulesByIdFormation = (req, res) => {
  const formationId = req.params.formationId;
  const q = "SELECT * FROM modules WHERE formation_id = ?";
  db.query(q, [formationId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

export const getModuleById = (req, res) => {
  const moduleId = req.params.moduleId;
  const q = "SELECT * from modules WHERE id = ?";

  db.query(q, [moduleId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
