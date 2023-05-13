import express from "express";

const app = express();
const port = 8500;

app.get("/", (req, res) => res.send("Hello ! Express comment ça va?"));

app.listen(port, () =>
  console.log(`L'application est lancée sur : http://localhost:${port}`)
);
