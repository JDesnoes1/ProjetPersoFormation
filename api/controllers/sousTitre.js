import { db } from "../db.js";

export const insertSousTitre = (req, res) => {
  const moduleId = Number(req.params.moduleId);
  const q =
    "INSERT INTO sous_titres (`contenu`, `ordre`, `idModule`) VALUES(?)";

  const values = [req.body.contenu, req.body.ordre, moduleId];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Succès ! Le sous-titre a bien été inséré !");
  });
};
