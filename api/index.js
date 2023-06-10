import express from "express";
import authRoutes from "./routes/auths.js";
import formationRoutes from "./routes/formations.js";
import achatRoutes from "./routes/achats.js";
import moduleRoutes from "./routes/modules.js";
import paragrapheRoutes from "./routes/paragraphes.js";
import sousTitreRoutes from "./routes/sousTitres.js";
import uploadRoutes from "./routes/uploads.js";

import { db } from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = 8500;

//Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/formation", formationRoutes);
app.use("/api/achat", achatRoutes);
app.use("/api/module", moduleRoutes);
app.use("/api/paragraphe", paragrapheRoutes);
app.use("/api/sousTitre", sousTitreRoutes);
app.use("/api/upload", uploadRoutes);

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

app.listen(port, () =>
  console.log(`L'application est lancée sur : http://localhost:${port}`)
);
