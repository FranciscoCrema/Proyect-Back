import { Schema, model } from "mongoose";
import moongosePaginate from "mongoose-paginate-v2";

const userSchema = new Schema({
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 },
});

userSchema.plugin(moongosePaginate);
export const UserModel = model("users", userSchema);
