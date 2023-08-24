import express from "express";

/* Archivos de la carpeta route */
import prod from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { usersRouter } from "./routes/user.router.js";
import { productsHome } from "./routes/products-home.router.js";
import { chat } from "./routes/chat.routes.js";
import { editProducts } from "./routes/edit-products.router.js";

/* Importacion de handlebars */
import handlebars from "express-handlebars";

/* Importacion de config */
import { __dirname } from "./config.js";

/* Archivos de mongoose */
import { connectMongo } from "./utils/dbConnection.js";
import { connectSocket } from "./utils/socketServer.js";

const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
  console.log(`App runing on ${__dirname} - server http://localhost:${port}`);
});
connectSocket(httpServer);

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/api/products", prod);
app.use("/api/carts", cartRouter);
app.use("/api/users", usersRouter);

app.use("/chat", chat);
app.use("/products-home", productsHome);
app.use("/edit-products", editProducts);

app.use(express.static((__dirname, "public")));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
