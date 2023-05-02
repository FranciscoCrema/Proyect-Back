const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    console.log(this.products);
    return this.products;
  }

  addProduct(title, description, price, thumbnail, stock) {
    let id = 1;
    if (this.products.length > 0) {
      const lastProduct = this.products[this.products.length - 1];
      id = lastProduct.code + 1;
    }

    const product = {
      code: id,
      title,
      description,
      price,
      thumbnail,
      stock,
    };
    this.products.push(product);
    console.log("Producto agregado:", product);
    return product;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.code === id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    console.log("Producto encontrado:", product);
    return product;
  }

  updateProduct(id, updateFields) {
    const productIndex = this.products.findIndex(
      (product) => product.code === id
    );
    if (productIndex === -1) {
      throw new Error("Producto no encontrado");
    }

    const product = this.products[productIndex];
    const updatedProduct = { ...product, ...updateFields, code: id };
    this.products[productIndex] = updatedProduct;
    console.log("Producto actualizado:", updatedProduct);
    return updatedProduct;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.code === id
    );
    if (productIndex === -1) {
      throw new Error("Producto no encontrado");
    }
    const product = this.products[productIndex];
    this.products.splice(productIndex, 1);
    console.log("Producto eliminado:", product);
  }
}

const productManager = new ProductManager();
console.log("Lista de productos vacía:");
productManager.getProducts(); // []

console.log("Agregando producto...");
const newProduct = productManager.addProduct(
  "Producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  25
);
console.log("Producto agregado:", newProduct);

console.log("Obteniendo lista de productos...");
productManager.getProducts(); // [{code: 1, title: "Producto prueba", description: "Este es un producto prueba", price: 200, thumbnail: "Sin imagen", stock: 25}]

console.log("Obteniendo producto por id...");
const foundProduct = productManager.getProductById(newProduct.code);
console.log("Producto encontrado:", foundProduct);

console.log("Actualizando producto...");
const updatedProduct = productManager.updateProduct(newProduct.code, {
  title: "Producto actualizado",
  price: 300,
});
console.log("Producto actualizado:", updatedProduct);

console.log("Eliminando producto...");
productManager.deleteProduct(updatedProduct.code);

console.log("Obteniendo lista de productos...");
productManager.getProducts(); // []
