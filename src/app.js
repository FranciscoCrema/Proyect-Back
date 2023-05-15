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
    res.status(300).json(readProduct);
  } else {
    res.status(200).json(readProduct.slice(0, limit));
  }
});

/* Mostrando producto por id */

app.get("/products/:id", async (req, res) => {
  let id = req.params.id;
  const productId = await product.getProductsById(parseInt(id));
  if (productId) {
    res.status(200).json(productId);
  } else {
    res.status(404).json({ error: "No se encuentra el producto por id" });
  }
});

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  const deletedProduct = await product.deleteProduct(parseInt(id));

  if (deletedProduct) {
    res.status(200).json({
      message: "Producto eliminado correctamente",
      Product: deletedProduct,
    });
  } else {
    res.status(404).json({ error: "No se encuentra el producto" });
  }
});

app.listen(port, () => {
  console.log(`Se esta viendo en http://localhost:${port}`);
});
