const express = require("express");
const router = express.Router();
const Posts = require("../models/posts");
const User = require("../models/user");

require("dotenv").config();

router.get("/public/profile/:id", async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById({ _id: id }).lean();
  res.render("publicProfile", {
    user: user,
    path: {
      category: true,
    },
  });
});

router.get("/public/profile/questions/:id", async (req, res, next) => {
  const id = req.params.id;
  const posts = await Posts.find({ user: id }).lean();
  console.log(posts);
  res.render("publicProfileQuestions", {
    posts: posts,
    path: {
      category: true,
    },
  });
});

module.exports = router;
