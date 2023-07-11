import { Server } from "socket.io";
import ProductManager from "../DAO/components/productManager.js";
import { MsgModel } from "../DAO/models/msgs.model.js";

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

    socket.on("msg_front_to_back", async (msg) => {
      try {
        await MsgModel.create(msg);
      } catch (e) {
        console.log(e);
      }

      try {
        const msgs = await MsgModel.find({});
        socketServer.emit("listado_de_msgs", msgs);
      } catch (e) {
        console.log(e);
      }
    });
  });
}
