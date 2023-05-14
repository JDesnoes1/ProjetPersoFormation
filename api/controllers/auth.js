import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  if (!req.body || !req.body.username) {
    return res.status(400).json("Le nom d'utilisateur est requis !");
  }
  //Vérifier si l'utilisateur existe
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("L'utilisateur existe déjà !");

    //Si l'utilisateur n'est pas présent en base de données, on peut donc créer un nouvel utilisateur.
    //On oublie pas de hash le password avec bcryptjs
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`, `email`, `nom`, `prenom`, `ville`, `mdp`) VALUES(?)";

    const values = [
      req.body.username,
      req.body.email,
      req.body.nom,
      req.body.prenom,
      req.body.ville,
      hashedPassword,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("L'utilisateur a bien été crée");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length)
      return res.status(404).json("L'utilisateur n'existe pas !");

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].mdp);

    if (!checkPassword)
      return res
        .status(400)
        .json("Mauvais mot de passe ou nom d'utilisateur !");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { mdp, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};
