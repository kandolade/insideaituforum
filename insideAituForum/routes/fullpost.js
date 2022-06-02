const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const Posts = require("../models/posts");
const Answers = require("../models/answers");
const Social = require("../models/social");
const isAuth = require("../middleware/is-auth");

require("dotenv").config();

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let { views } = await Posts.findById({ _id: id });

  let answers = await Answers.find({ postId: id }).lean();

  let recommended = await Posts.find().lean();
  recommended = recommended.sort((a, b) =>
    a.views.toString().localeCompare(b.views.toString())
  );

  let result = await Posts.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        views: views + 1,
      },
      new: true,
    }
  ).lean();

  res.render("Fullpost", {
    answers: answers,
    recommended: recommended,
    post: result,
    errorMessage: null,
    validationErrors: [],
    path: {
      category: true,
    },
  });
});

router.get("/social/like/:id", isAuth, async (req, res, next) => {
  const postId = req.params.id;
  const result = await Social.find({ postId: postId, user: req.session.user });

  console.log(result);
  if (!result.length > 0) {
    const social = new Social({
      postId: postId,
      user: req.session.user,
    });
    await social.save();

    let { likes } = await Posts.findOne({ _id: postId });
    likes = likes + 1;



    await Posts.findOneAndUpdate(
      { _id: postId },
      {
        $set: {
          likes: likes,
        },
        new: true,
      }
    );
    res.redirect(`/fullpost/${postId}`);
  } else {
    res.redirect(`/fullpost/${postId}`);
  }
});

router.get("/social/like/answers/:id", isAuth, async (req, res, next) => {
  const postId = req.params.id;

  const result = await Social.find({ postId: id, user: req.session.user });
  console.log(result);
  if (!result.length > 0) {
    const social = new Social({
      postId: postId,
      user: req.session.user,
    });
    await social.save();

    let { likes } = await Posts.findOne({ _id: id });
    likes = likes + 1;

    await Posts.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          likes: likes,
        },
        new: true,
      }
    );
    res.redirect(`/fullpost/${id}`);
  } else {
    res.redirect(`/fullpost/${id}`);
  }
});

module.exports = router;
