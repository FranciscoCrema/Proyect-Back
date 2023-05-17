import { Router } from "express";
import ProductManager from "../components/productManager.js";

const router = Router();
const product = new ProductManager();
const readProduct = product.readProducts();

/* Muestro todos los productos o mediante query el producto que uno guste */
router.get("/", (req, res) => {
  const limit = req.query.limit;
  if (!limit) {
    res.status(300).json(readProduct);
  } else {
    res.status(200).json(readProduct.slice(0, limit));
  }
});

/* Mostrando producto por id */
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  const productId = await product.getProductsById(parseInt(id));
  if (productId) {
    res.status(200).json(productId);
  } else {
    res.status(404).json({ error: "No se encuentra el producto por id" });
  }
});

/* Borrando un producto por id */
router.delete("/:id", async (req, res) => {
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

router.post("/:id", async (req, res) => {
  const productA = req.body;
  const newProduct = await product.addProducts(productA);

  return res
    .status(201)
    .json({ status: "success", msg: "Product added", data: newProduct });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateProducts = product.updateProduct(id);
  return res
    .status(201)
    .json({ status: "success", msg: "Update product", data: updateProducts });
});

export default router;
