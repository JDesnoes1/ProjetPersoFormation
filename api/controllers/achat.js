import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getAchat = (req, res) => {
  const q = "SELECT id_user FROM achats WHERE id_formation = ?";

  db.query(q, [req.query.id_formation], (err, data) => {
    if (err) return res.status(500).json(err);

    const userIds = data.map((achat) => achat.id_user);
    return res.status(200).json({ userIds });
  });
};

export const addAchat = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Vous n'êtes pas connecté");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Le token n'est pas valide");

    const q = "INSERT INTO achats (`id_user`, `id_formation`) VALUES (?)";

    const values = [userInfo.id, req.body.formationId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("La formation a bien été achetée");
    });
  });
};

export const getAllAchats = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Vous n'êtes pas connecté");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Le token n'est pas valide");

    const q =
      "SELECT achats.id, achats.id_formation, formations.nom FROM achats JOIN formations ON achats.id_formation = formations.id WHERE achats.id_user = ?";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
