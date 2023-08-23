import fs from "fs";
import { __dirname } from "../../config.js";
const cartPath = `${__dirname}\/data/cart.JSON`;

export default class CartManager {
  constructor() {
    this.path = cartPath;
    this.carts = [];
  }

  async addProductsCart(products) {
    try {
      const cartP = this.getCard();
      let idMax = 0;
      cartP.forEach((p) => {
        if (p.id > idMax) {
          idMax = p.id;
        }
      });
      idMax++;
      cartP.push({ id: idMax, products });
      this.saveCarts(cartP);

      const newCart = cartP.find((p) => p.id === idMax);
      return newCart;
    } catch (error) {
      return { message: error.message };
    }
  }

  readCartProducts() {
    let resultCart = fs.readFileSync(this.path, "utf-8");
    this.carts = JSON.parse(resultCart);
    return this.carts;
  }

  getCard() {
    let resultCart3 = this.readCartProducts();
    return this.carts;
  }

  async getCardById(cartId) {
    let resultCart2 = await this.readCartProducts();
    const cart = resultCart2.find((cart) => cart.id === cartId);
    if (cart) {
      console.log(cart);
      return cart;
    } else {
      return null;
    }
  }

  saveCarts(data) {
    let saveCart = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.path, saveCart);
  }
}
