import express from "express";
import ProductManager from "../DAO/components/productManager.js";
import { ProductsModel } from "../DAO/models/products.model.js";

const cartP = new ProductManager();
const readProduct = cartP.readProducts();

export const productsHome = express.Router();

productsHome.get("/", async (req, res) => {
  try {
    const productos = await ProductsModel.paginate({}, { limit: 5, page: 1 });
    if (req.xhr) {
      return res.status(200).json({ ajaxResponse: productos });
    }

    res.status(200).render("products-home", { productos, readProduct });
  } catch (e) {
    console.log(e);
    return res.status(500).render("error-products");
  }
});
