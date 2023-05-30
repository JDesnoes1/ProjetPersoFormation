import { db } from "../db.js";

export const insertParagraphe = (req, res) => {
  const moduleId = req.params.moduleId;
  const q =
    "INSERT INTO paragraphes (`contenu`, `ordre`, `idModule`) VALUES(?)";

  const values = [req.body.contenu, req.body.ordre, moduleId];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Succès ! Le paragraphe a bien été inséré !");
  });
};

export const updateParagraphe = (req, res) => {
  const q = "UPDATE paragraphes SET `contenu`=?, `ordre`=? WHERE id = ?";

  db.query(q, [req.body.contenu, req.body.ordre, req.body.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Succès ! Le paragraphe a été modifié !");
  });
};

export const deleteParagraphe = (req, res) => {
  const q = "DELETE FROM paragraphes WHERE id = ?";

  db.query(q, [req.body.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Succès ! Le paragraphe a bien été supprimé !");
  });
};
