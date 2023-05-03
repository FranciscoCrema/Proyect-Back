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
    let id = 0;
    this.products.forEach((product) => {
      if (product.code > id) {
        id = product.code;
      }
    });
    id++;

    const product = {
      code: id,
      title,
      description,
      price,
      thumbnail,
      stock,
    };
    this.products.push(product);
    fs.writeFileSync("products.json", JSON.stringify(this.products));
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

  updateProduct() {}

  deleteProduct() {}
}

const productManager = new ProductManager();

productManager.getProducts();

productManager.addProduct =
  ("Titulo1", "Descripcion1", 200, "img1", "abc123", 25);
productManager.addProduct =
  ("Titulo2", "Descripcion2", 2000, "img2", "abc124", 55);
productManager.addProduct =
  ("Titulo3", "Descripcion3", 500, "img3", "abc125", 15);

// console.log("Producto agregado:", newProduct, newProduct2);

// console.log("Obteniendo lista de productos...");
// productManager.getProducts();

// console.log("Obteniendo producto por id...");
// const foundProduct = productManager.getProductById(newProduct.code);
// const foundProduct2 = productManager.getProductById(newProduct2.code);
// console.log("Producto encontrado:", foundProduct, foundProduct2);

// console.log("Actualizando producto...");
// const updatedProduct = productManager.updateProduct(newProduct.code, {
//   title: "Producto actualizado",
//   price: 300,
// });
// const updatedProduct2 = productManager.updateProduct(newProduct2.code, {
//   title: "Producto actualizado",
//   price: 350,
// });
// console.log("Producto actualizado:", updatedProduct, updatedProduct2);

// console.log("Eliminando producto...");
// productManager.deleteProduct(updatedProduct.code);

// console.log("Obteniendo lista de productos...");
// productManager.getProducts();
