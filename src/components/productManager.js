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
    fs.writeFileSync("../../products.json", JSON.stringify(this.products));
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
      return null;
    }
  }

  async deleteProduct(id) {
    let result3 = await this.readProducts();
    let deletedProduct = null;

    let updatedProducts = result3.filter((product) => {
      if (product.id === id) {
        deletedProduct = product;
        return false;
      }
      return true;
    });

    fs.writeFileSync("../../products.json", JSON.stringify(updatedProducts));
    console.log("Producto eliminado", deletedProduct);

    return deletedProduct;
  }

  updateProduct = async ({ id, ...product }) => {
    let idProd = await this.readProducts();
    let prodModific = [{ ...product, id }, ...idProd];
    fs.writeFileSync("../../products.json", JSON.stringify(prodModific));
    console.log("Producto actualizado", prodModific);
  };
}
