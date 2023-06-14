import express from "express";

export const realTimeProducts = express.Router();

realTimeProducts.get("/", (req, res) => {
  return res.status(200).render("real-time-products", {});
});
