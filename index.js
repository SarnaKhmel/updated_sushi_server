import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";

import bcrypt from "bcrypt";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
  productCreateValidation,
  orderCreateValidation,
  passwordChangeValidation,
} from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import {
  UserController,
  PostController,
  ProductController,
  OrderController,
} from "./controllers/index.js";

import fs from "fs";
import path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

mongoose
  .connect(
    "mongodb+srv://admin:NDQtU8psAZpxqmL9@crud.phfcxck.mongodb.net/sushi?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Success connect DB! 👍");
  })
  .catch((err) => {
    console.log("Error connecting DB((( 😥 ", err);
  });
// qeqelock123
// mongoose
//     .connect(
//         "mongodb://localhost:27018/your-database-name"
//     )
//     .then(() => {
//       console.log("Успішне підключення до бази даних! 👍");
//     })
//     .catch((err) => {
//       console.log("Помилка підключення до бази даних((( 😥 ", err);
//     });

const app = express();
const port = process.env.PORT || 1234;

const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/posts");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadPost = multer({ storage: postStorage });
const uploadProduct = multer({ storage: productStorage });
app.use(express.json());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use("/uploads", express.static("uploads"));

// Admin routes
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.patch(
  "/auth/password",
  checkAuth,
  passwordChangeValidation,
  UserController.changePassword
);

//Order

app.get("/order", checkAuth, OrderController.getAll);
app.get("/order/:id", checkAuth, OrderController.getOne);

app.post(
  "/order",
 // orderCreateValidation,
  handleValidationErrors,
  OrderController.create
);

app.delete("/order/:id", checkAuth, OrderController.remove);

app.get("/order/:id", (req, res) => {
  res.send("Hello, world!");
});

app.patch(
  "/order/:id",

  orderCreateValidation,
  handleValidationErrors,
  OrderController.update
);

// app.patch(
//   "some/:id",
//   checkAuth,
//   orderCreateValidation,
//   handleValidationErrors,
//   OrderController.update
// );

//Product
app.post(
  "/upload/products",
  checkAuth,
  uploadProduct.single("image"),
  (req, res) => {
    res.json({
      url: `/uploads/products/${req.file.originalname}`,
    });
  }
);

app.delete("/upload/products/:imageName", checkAuth, (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "uploads/products", imageName);

  fs.unlink(imagePath, (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete image" });
    } else {
      res.json({ message: "Image deleted successfully" });
    }
  });
});

app.get("/products", ProductController.getAll);
app.get("/products/:id", ProductController.getOne);
app.post(
  "/auth/products",
  checkAuth,
  productCreateValidation,
  handleValidationErrors,
  ProductController.create
);
app.delete("/auth/products/:id", checkAuth, ProductController.remove);

// app.patch(
//   "/auth/products/:id",
//   checkAuth,
//   productCreateValidation,
//   handleValidationErrors,
//   ProductController.update
// );

app.patch(
  "/auth/products/:id",
  checkAuth,
  productCreateValidation,
  handleValidationErrors,
  ProductController.update
);

//Post
// app.post("/upload/post", checkAuth, uploadPost.single("image"), (req, res) => {
//   res.json({
//     url: `/uploads/posts/${req.file.originalname}`,
//   });
// });

app.post("/upload/posts", checkAuth, uploadPost.single("image"), (req, res) => {
  res.json({
    url: `/uploads/posts/${req.file.originalname}`,
  });
});

app.delete("/upload/posts/:imageName", checkAuth, (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "uploads/posts", imageName);

  fs.unlink(imagePath, (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete image" });
    } else {
      res.json({ message: "Image deleted successfully" });
    }
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/auth/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/auth/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/auth/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.get("/", (req, res) => {
  res.send(`Server is OK 🤌🤘
  <br/>
  <br/> port: ${port}
  <br/>
  <br/>
  <br/> PRIVATE routes
  <br/> /auth/register - POST - register-admin,
  <br/> /auth/login - POST - login-admin,
  <br/> /auth/me - GET - info-admin
  <br/>
  <br/> /auth/posts - POST - create-post
  <br/> /auth/posts/:id - PATCH - update-post
  <br/> /auth/posts/:id - DELETE - delete-post
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/> PUBLIC routes
  <br/>
  <br/> /posts - GET - get-posts
  <br/> /posts/:id - GET - get-one-posts
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>

  `);
});
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server OK! Port: ${port}`);
});
