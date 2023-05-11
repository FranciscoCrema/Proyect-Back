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
    res.send(readProduct);
  } else {
    res.send(readProduct.slice(0, limit));
  }
});

/* Mostrando producto por id */

app.get("/products/:id", (req, res) => {
  let id = req.params.id;
  const productId = product.getProductsById(parseInt(id));
  if (productId) {
    res.send(productId);
  } else {
    console.log("No existe el id");
  }
});

app.listen(port, () => {
  console.log(`Se esta viendo en http://localhost:${port}`);
});
