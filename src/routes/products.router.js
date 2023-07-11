import { Router } from "express";
import ProductManager from "../DAO/components/productManager.js";

const router = Router();
const cartP = new ProductManager();
const readProduct = cartP.readProducts();

/* Muestro todos los productos o mediante query el producto que uno guste */
router.get("/", (req, res) => {
  const limit = req.query.limit;
  if (!limit) {
    res.status(300).json(readProduct);
  } else {
    res.status(201).json(readProduct.slice(0, limit));
  }
});

/* Mostrando producto por id */
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  const productId = await cartP.getProductsById(parseInt(id));
  if (productId) {
    res.status(200).json(productId);
  } else {
    res.status(404).json({ error: "No se encuentra el producto por id" });
  }
});

/* Borrando un producto por id */
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedProduct = await cartP.deleteProduct(parseInt(id));

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
  const newProduct = await cartP.addProducts(productA);

  return res
    .status(201)
    .json({ status: "success", msg: "Product added", data: newProduct });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateProducts = cartP.updateProduct(id);
  return res
    .status(201)
    .json({ status: "success", msg: "Update product", data: updateProducts });
});

export default router;
