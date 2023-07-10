import express from "express";
import prod from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { usersRouter } from "./routes/user.router.js";
import { home } from "./routes/home.router.js";
import { realTimeProducts } from "./routes/real-time-products.router.js";
import handlebars from "express-handlebars";
import { __dirname, connectMongo } from "./utils.js";
import { Server } from "socket.io";
import ProductManager from "./components/productManager.js";
import { chat } from "./routes/chat.routes.js";

const app = express();
const port = 8080;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", prod);
app.use("/api/carts", cartRouter);
app.use("/api/users", usersRouter);

app.use(express.static((__dirname, "public")));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/chat", chat);

app.use("/home", home);

app.use("/real-time-products", realTimeProducts);

const httpServer = app.listen(port, () => {
  console.log(`Se esta viendo en http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

const cartP = new ProductManager();

socketServer.on("connection", async (socket) => {
  socket.on("new-product", async (msg) => {
    const { title, description, price, code, img, stock, category, status } =
      msg;

    await cartP.addProducts(
      title,
      description,
      price,
      code,
      img,
      stock,
      category,
      status
    );
  });
  const products = await cartP.getProducts();
  socket.emit("show-products", products);
  socket.on("delete-product", async (e) => {
    const { pCode } = e;

    await cartP.deleteProduct(pCode);
  });
  const producDelete = await cartP.getProducts();
  socket.emit("update-products", producDelete);

  let msgs = [];
  socket.on("msg_front_to_back", (msg) => {
    msgs.push(msg);
    socketServer.emit("listado_de_msgs", msgs);
  });
});
