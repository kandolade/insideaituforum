const express = require("express");
const router = express.Router();
const Posts = require("../models/posts");

require("dotenv").config();

router.get("/:category", (req, res, next) => {
  const category = req.params.category;
  Posts.find({ category: category })
    .lean()
    .then((result) => {
      res.render("Home", {
        posts: result,
        errorMessage: null,
        validationErrors: [],
        path: {
          category: true,
        },
      });
    });
});

module.exports = router;
