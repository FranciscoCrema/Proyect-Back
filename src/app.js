import express from "express";
import prod from "./routes/products.router.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", prod);

app.listen(port, () => {
  console.log(`Se esta viendo en http://localhost:${port}`);
});
