import fs from "fs";

export default class CartManager {
  constructor() {
    this.carts = [];
  }

  async addProductsCart() {
    try {
      const cartP = this.getCard();
      let idMax = 0;
      cartP.forEach((p) => {
        if (p.id > idMax) {
          idMax = p.id;
        }
      });
      idMax++;
      cartP.push({ id: idMax, products: [] });
      const cartString = JSON.stringify(cartP);
      fs.writeFileSync("../../cart.json", cartString);
      return cartString;
    } catch (error) {
      console.log(error);
    }
  }

  readCartProducts() {
    let resultCart = fs.readFileSync("./cart.json", "utf-8");
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
    let saveCart = JSON.stringify(data);
    fs.writeFileSync("../../cart.json", saveCart);
  }
}
