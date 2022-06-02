const express = require("express");
const router = express.Router();
const Posts = require("../models/posts");
const Follow = require("../models/follow");
const isAuth = require("../middleware/is-auth");

require("dotenv").config();

router.get("/follow/posts", isAuth, async (req, res, next) => {
  const final = await Follow.find({
    followedBy: req.session.user._id,
  })
    .populate("posts")
    .exec();
  const result = final.map((element) => {
    return {
      title: element.posts.title,
      id: element.posts._id,
      author: element.posts.author,
    };
  });
  res.render("followed", {
    posts: result,
    active: { follow: true },
  });
});

router.get("/follow/:id", isAuth, async (req, res, next) => {
  const postId = req.params.id;
  const result = await Follow.find({
    posts: postId,
    followedBy: req.session.user._id,
  });
  if (
    result === [] ||
    result === null ||
    result === undefined ||
    result === {} ||
    result === "[]"
  ) {
    res.redirect(`/fullpost/${postId}`);
  } else {
    const newResult = new Follow({
      posts: postId,
      followedBy: req.session.user._id,
    });
    await newResult.save();
    res.redirect("/follow/posts");
  }
});

module.exports = router;
