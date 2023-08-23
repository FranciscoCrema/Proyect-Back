import express from "express";

export const editProducts = express.Router();

editProducts.get("/", (req, res) => {
  return res.status(200).render("edit-products", {});
});
