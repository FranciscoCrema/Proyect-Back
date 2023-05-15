import fs from "fs";

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
    this.products.push(newProduct);
    fs.writeFileSync("products.json", JSON.stringify(this.products));
  }

  readProducts() {
    let result = fs.readFileSync("products.json", "utf-8");
    this.products = JSON.parse(result);
    return this.products;
  }

  async getProducts() {
    let result2 = await this.readProducts();
    console.log(result2);
    return this.prodcts;
  }

  async getProductsById(id) {
    let result3 = await this.readProducts();
    const product = result3.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("No existe el id");
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
