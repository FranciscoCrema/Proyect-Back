import { Schema, model } from "mongoose";

export const MsgModel = model(
  "msgs",
  new Schema({
    msg: { type: String, required: true, max: 100 },
    user: { type: String, required: true, max: 100 },
  })
);
