import { db } from "../db.js";

export const insertParagraphe = (req, res) => {
  const moduleId = req.params.moduleId;
  const q =
    "INSERT INTO paragraphes (`contenu`, `ordre`, `idModule`) VALUES(?)";

  const values = [req.body.contenu, req.body.ordre, moduleId];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json("Le paragraphe a bien été inséré dans le module avec succès !");
  });
};