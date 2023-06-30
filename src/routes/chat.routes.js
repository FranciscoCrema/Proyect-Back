import express from "express";

export const chat = express.Router();

chat.get("/", (req, res) => {
  return res.status(200).render("chat", {});
});
