class ProductManager {
  constructor() {
    this.prodcts = [];
    this.id = 1;
  }

  getProducts() {
    return this.prodcts;
  }

  addProducts(title, description, price, img, code, stock) {
    const prod = {
      title,
      description,
      price,
      img,
      code,
      stock,
    };
  }

  getProductById() {}
}

const product = new ProductManager();

product.addProducts("Titel1", "Description1", 200, "img1", "56207062", 25);
product.addProducts("Titel2", "Description2", 500, "img2", "56189368", 50);
product.addProducts("Titel3", "Description3", 380, "img3", "51763580", 75);
