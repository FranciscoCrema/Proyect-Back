import express from "express";
import ProductManager from "../components/productManager.js";

const cartP = new ProductManager();
const readProduct = cartP.readProducts();

export const home = express.Router();

home.get("/", (req, res) => {
  return res.status(200).render("home", { readProduct });
});
