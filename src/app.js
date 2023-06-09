import express from "express";
import prod from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { testPlantillaProducts } from "./routes/test-plantilla-products.router.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", prod);
app.use("/api/carts", cartRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/test-plantilla-products", testPlantillaProducts);

app.listen(port, () => {
  console.log(`Se esta viendo en http://localhost:${port}`);
});
