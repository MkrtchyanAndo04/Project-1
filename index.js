import express from "express";
import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
  .connect("mongodb+srv://user:123@cluster0.luca1qx.mongodb.net/blog")
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("error", err));

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", PostController.update);

app.listen(4444, (err) => {
  if (err) {
    return err;
  }
  console.log("Server OK");
});
