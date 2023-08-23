import express from "express";
import ProductManager from "../DAO/components/productManager.js";

const cartP = new ProductManager();
const readProduct = cartP.readProducts();

export const productsHome = express.Router();

productsHome.get("/", (req, res) => {
  return res.status(200).render("products-home", { readProduct });
});
