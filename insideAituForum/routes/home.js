const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
require("dotenv").config();
const Posts = require("../models/posts");

function trimContent(content) {
  const map1 = content.map((post) => {
    let { contentWithoutMarkup } = post;
    let newContent = contentWithoutMarkup.substring(0, 200);
    post.contentWithoutMarkup = newContent;
    return post;
  });
  return map1;
}

router.get("/", async (req, res, next) => {
  let { category = false } = req.query;
  if (category) {
    var result = await Posts.find().lean();
    result = trimContent(result);
    var recommended = [...result];
    result = result.filter(
      (singleResult) => singleResult.category === category
    );
  } else {
    var result = await Posts.find().lean();
    result = trimContent(result);
    var recommended = [...result];
  }

  recommended = recommended.sort((a, b) =>
    a.views.toString().localeCompare(b.views.toString())
  );
  res.render("Home", {
    posts: result,
    recommended: recommended,
    pageTitle: "IA - Forum",
    active: { home: true },
    path: {
      category: true,
    },
  });
});

module.exports = router;
