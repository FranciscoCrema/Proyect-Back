const express = require("express");
import ProductManager from "./components/productManager";

let product = new ProductManager("products.json");

product.addProducts("Titel1", "Description1", 200, "img1", "56207062", 25);
product.addProducts("Titel2", "Description2", 500, "img2", "56189368", 50);
product.addProducts("Titel3", "Description3", 380, "img3", "51763580", 75);
product.addProducts("Titel4", "Description4", 100, "img4", "75037140", 30);
product.addProducts("Titel5", "Description5", 550, "img5", "32750236", 80);
product.addProducts("Titel6", "Description6", 480, "img6", "01734875", 15);
product.addProducts("Titel7", "Description7", 800, "img7", "65083175", 100);
product.addProducts("Titel8", "Description8", 50, "img8", "17659309", 38);
product.addProducts("Titel9", "Description9", 80, "img9", "65794658", 90);
product.addProducts("Titel10", "Description10", 680, "img10", "16564082", 45);

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
