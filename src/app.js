import express from "express";
import ProductManager from "./components/productManager.js";
const app = express();
const port = 8080;

const product = new ProductManager();
const readProduct = product.readProducts();

/* Muestro todos los productos o mediante query el producto que uno guste */
app.get("/products", (req, res) => {
  const limit = req.query.limit;
  if (!limit) {
    res.status(300).send(readProduct);
  } else {
    res.status(200).send(readProduct.slice(0, limit));
  }
});

/* Mostrando producto por id */

app.get("/products/:id", (req, res) => {
  let id = req.params.id;
  const productId = product.getProductsById(parseInt(id));
  if (productId) {
    res.status(200).send(productId);
  } else {
    res.status(404).send(productId);
  }
});

app.listen(port, () => {
  console.log(`Se esta viendo en http://localhost:${port}`);
});
