import express from "express";
import CartManager from "../components/cartManager.js";
import ProductManager from "../components/productManager.js";

const cartRouter = express.Router();

const cartM = new CartManager();
const cartP = new ProductManager();
const readCart = cartM.readCartProducts();

/* Muestro todos los productos o mediante query el producto que uno guste */
cartRouter.get("/", (req, res) => {
  const limit = req.query.limit;
  if (!limit) {
    res.status(300).json(readCart);
  } else {
    res.status(200).json(readCart.slice(0, limit));
  }
});

/* Mostrando producto por id */
cartRouter.get("/:cid", async (req, res) => {
  let id = req.params.id;
  const productId = await cartM.getCardById(parseInt(id));
  if (productId) {
    res.status(200).json(productId);
  } else {
    res.status(404).json({ error: "No se encuentra el producto por id" });
  }
});

cartRouter.post("/:cid/products/:id", async (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.id;

  const card = await cartM.getCard();
  const products = await cartP.getProducts();
  console.log(products);
  console.log(products[cartId]);
  const cartExist = card.find((cart) => cart.id === +cartId);

  console.log(cartExist);

  const productExist = products.find((prod) => prod.id === +prodId);
  if (!productExist || !cartExist) {
    return res.status(404).json({ error: "Carrito o Producto no existente" });
  }

  if (cartExist) {
    const existingProduct = cartExist.products.find(
      (prod) => prod.idProduct === +prodId
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cartExist.products.push({ idProduct: +prodId, quantity: 1 });
    }
  } else {
    const newCart = {
      id: +cartId,
      products: [{ idProduct: +prodId, quantity: 1 }],
    };
    card.push(newCart);
  }

  cartM.saveCarts(card);
  res.status(200).json({
    status: "success",
    msg: `Producto Agregado Correctamente`,
    data: cartExist,
  });
});

export default cartRouter;
