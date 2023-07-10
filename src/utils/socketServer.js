import { Server } from "socket.io";
import ProductManager from "../components/productManager.js";

export function connectSocket(httpServer) {
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
}
