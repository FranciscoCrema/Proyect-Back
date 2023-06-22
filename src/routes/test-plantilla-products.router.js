import express from "express";
import ProductManager from "../components/productManager.js";

const cartP = new ProductManager();
const readProduct = cartP.readProducts();

export const testPlantillaProducts = express.Router();

testPlantillaProducts.get("/", (req, res) => {
  return res.status(200).render("test-plantilla-products", { readProduct });
});