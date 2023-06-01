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
  const q =
    "SELECT m.id AS module_id, m.titre AS module_titre, p.id AS paragraphe_id, p.contenu AS paragraphe_contenu, p.ordre AS paragraphe_ordre, p.idModule AS paragraphe_module, s.id AS st_id, s.contenu AS st_contenu, s.ordre AS st_ordre, s.idModule AS st_module FROM modules m INNER JOIN paragraphes p ON m.id = p.idModule INNER JOIN sous_titres s ON m.id = s.idModule WHERE m.id = 1 ORDER BY p.ordre, s.ordre";

  db.query(q, [moduleId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
