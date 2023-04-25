class ProductManager {
  constructor() {
    this.products = [];
  }
  getProducts() {
    console.log(this.products);
    return this.products;
  }
  addProduct(title, description, price, thumbnail, code, stock) {
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
  }
  getProductById(id) {
    let productId = this.products.find((product) => product.code === id);
    if (productId) {
      return console.log(productId);
    } else {
      return console.log("No se puede");
    }
  }
}

const francisco = new ProductManager();
francisco.getProducts();
francisco.addProduct(
  "Producto prueba",
  "este es un producto prueba",
  200,
  "sin imagen",
  25
);
francisco.getProductById(1);

const lucas = new ProductManager();
lucas.getProducts();
lucas.addProduct(
  "Producto prueba",
  "este es un producto prueba",
  500,
  "sin imagen",
  35
);
lucas.getProductById(2);
