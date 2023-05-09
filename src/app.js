const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Holaaaa");
});

app.get("/fran", (req, res) => {
  res.json({
    nombre: "fran",
    apellido: "crema",
  });
});

app.listen(port, () => {
  console.log(`Se esta viendo ${port}`);
});
