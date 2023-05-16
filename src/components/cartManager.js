import fs from "fs";
import ProductManager from "./productManager.js";

export default class CartManager {
  constructor() {
    this.products = [];
    this.id = 1;
  }
}
