const fs = require("fs");

export default class ProductManager {
  constructor() {
    this.prodcts = [];
    this.id = 1;
  }

  async addProducts(title, description, price, img, code, stock) {
    const newProduct = {
      title,
      description,
      price,
      img,
      code,
      stock,
      id: this.id++,
    };
    this.prodcts.push(newProduct);
    fs.writeFileSync("products.json", JSON.stringify(this.prodcts));
  }

  readProducts() {
    let result = fs.readFileSync("products.json", "utf-8");
    return JSON.parse(result);
  }

  async getProducts() {
    let result2 = await this.readProducts();
    console.log(result2);
    return this.prodcts;
  }

  async getProductsById(id) {
    let result3 = await this.readProducts();
    if (!result3.find((prodcts) => prodcts.id === id)) {
      console.log("No se encuentra el producto");
    } else {
      console.log(result3.find((prodcts) => prodcts.id === id));
    }
  }

  async deleteProduct(id) {
    let result3 = await this.readProducts();
    let productId = result3.filter((prodcts) => prodcts.id != id);
    fs.writeFileSync("products.json", JSON.stringify(productId));
    console.log("Producto eliminado", productId);
  }

  updateProduct = async ({ id, ...product }) => {
    let idProd = await this.readProducts();
    let prodModific = [{ ...product, id }, ...idProd];
    fs.writeFileSync("products.json", JSON.stringify(prodModific));
    console.log("Producto actualizado", prodModific);
  };
}
