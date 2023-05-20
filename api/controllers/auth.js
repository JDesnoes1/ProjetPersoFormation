import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //Vérifier si les éléments sont null ou pas

  if (!req.body || !req.body.username) {
    return res.status(400).json("Le nom d'utilisateur est requis !");
  }
  if (!req.body.email) {
    return res.status(400).json("L'email est requis !");
  }
  if (!req.body.nom) {
    return res.status(400).json("Le nom est requis !");
  }
  if (!req.body.prenom) {
    return res.status(400).json("Le prénom est requis !");
  }
  if (!req.body.ville) {
    return res.status(400).json("La ville doit être renseignée !");
  }
  if (!req.body.password) {
    return res.status(400).json("Vous devez choisir un mot de passe !");
  }

  //Vérifier la taille des éléments

  if (req.body.username.length <= 2 || req.body.username.length > 20) {
    return res
      .status(400)
      .json(
        "Le nom d'utilisateur doit avoir plus de 2 caractères ou moins de 20 !"
      );
  }
  if (req.body.email.length <= 5) {
    return res.status(400).json("L'email doit avoir plus de 5 caractères !");
  }
  if (req.body.nom.length <= 2 || req.body.nom.length > 20) {
    return res
      .status(400)
      .json("Le nom doit avoir plus de 2 caractères ou moins de 20 !");
  }
  if (req.body.prenom.length <= 2 || req.body.prenom.length > 20) {
    return res
      .status(400)
      .json("Le prenom doit avoir plus de 2 caractères ou moins de 20 !");
  }
  if (req.body.ville.length <= 2 || req.body.ville.length > 50) {
    return res
      .status(400)
      .json("La ville doit avoir plus de 2 caractères ou moins de 50 !");
  }

  //Vérification du mot de passe

  function validateMDP(mdp) {
    const Reg = new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    );
    return Reg.test(mdp);
  }
  let password = req.body.password;

  if (!validateMDP(password)) {
    return res
      .status(400)
      .json(
        "Le mot de passe doit avoir : Minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (#?!@$%^&*-)"
      );
  }

  //Vérification de l'adresse mail

  function validateEmail(email) {
    var emailReg = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i
    );
    return emailReg.test(email);
  }

  let mail = req.body.email;

  if (!validateEmail(mail)) {
    return res.status(400).json("Votre email n'est pas valide !");
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
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    const { mdp, ispremium, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        expires: expirationDate,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("L'utilisateur a été déconnecté avec succès.");
};
