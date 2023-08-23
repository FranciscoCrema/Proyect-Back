import fs from "fs";
import { __dirname } from "../../config.js";
const productPath = `${__dirname}/data/products.JSON`;

export default class ProductManager {
  constructor() {
    this.path = productPath;
    this.products = [];
    this.id = 1;
  }

  async addProducts(
    title,
    description,
    price,
    code,
    img,
    stock,
    category,
    status
  ) {
    this.readProducts();
    this.id = this.products.at(-1).id;
    const newProduct = {
      title,
      description,
      price,
      code,
      img,
      stock,
      category,
      status,
      id: this.id + 1,
    };
    this.products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }

  readProducts() {
    let result = fs.readFileSync(this.path, "utf-8");
    this.products = JSON.parse(result);
    return this.products;
  }

  async getProducts() {
    let result2 = await this.readProducts();
    return this.products;
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
      if (product.code === id) {
        deletedProduct = product;
        return false;
      }
      return true;
    });

    fs.writeFileSync(this.path, JSON.stringify(updatedProducts));
    console.log("Producto eliminado", deletedProduct);

    return deletedProduct;
  }

  updateProduct = async ({ id, ...product }) => {
    let idProd = await this.readProducts();
    let prodModific = [{ ...product, id }, ...idProd];
    fs.writeFileSync(this.path, JSON.stringify(prodModific));
    console.log("Producto actualizado", prodModific);
  };
}
