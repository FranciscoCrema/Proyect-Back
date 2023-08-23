import { connect } from "mongoose";
import { UserModel } from "../DAO/models/users.model.js";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://francrema00:1ETVneUJdphWILl5@back-end-coder.z1w3cli.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!");

    // const res = await UserModel.paginate({}, { limit: 5, page: 1 });
    // console.log(res);
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
