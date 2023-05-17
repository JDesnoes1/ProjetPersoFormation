import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getAchat = (req, res) => {
  const q = "SELECT id_user FROM achats WHERE id_formation = ?";

  db.query(q, [req.query.id_formation], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data.map((achat) => achat.id_user));
  });
};
