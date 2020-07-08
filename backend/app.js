const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");
const app = express();

mongoose
  .connect(
    "mongodb+srv://pichael:UpH0Xsu1x1KSZjUv@cluster0.abvjm.mongodb.net/posts?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("connection to db failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json({ message: "blah" });
});

app.use("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched succesfully",
      posts: documents,
    });
  });
});

module.exports = app;
