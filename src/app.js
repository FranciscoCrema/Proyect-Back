import express from "express";
import prod from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { testPlantillaProducts } from "./routes/test-plantilla-products.router.js";
import { realTimeProducts } from "./routes/real-time-products.router.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", prod);
app.use("/api/carts", cartRouter);

app.use(express.static((__dirname, "public")));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/test-plantilla-products", testPlantillaProducts);

app.use("/real-time-products", realTimeProducts);

const httpServer = app.listen(port, () => {
  console.log(`Se esta viendo en http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  // setInterval(() => {
  //   socket.emit("msg_back_front", {
  //     msg: "hola back",
  //     user: "usuario",
  //   });
  // }, 1000);

  socket.on("msg_front_back", (msg) => {
    console.log(msg);
  });
});
