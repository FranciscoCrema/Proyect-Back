import express from "express";
import CartManager from "../components/cartManager";

export const cartRouter = express.Router();

const cartManager = new CartManager();
