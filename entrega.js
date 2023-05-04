const fs = require("fs");

class ProductManager {
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
    console.log(this.prodcts);
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

const product = new ProductManager();

product.addProducts("Titel1", "Description1", 200, "img1", "56207062", 25);
product.addProducts("Titel2", "Description2", 500, "img2", "56189368", 50);
product.addProducts("Titel3", "Description3", 380, "img3", "51763580", 75);
product.getProducts();

product.getProductsById(1);
product.deleteProduct(1);
product.updateProduct({
  title: "Titel2",
  description: "Description2",
  price: 5000,
  img: "img2",
  code: "56189368",
  stock: 10,
  id: 2,
});
