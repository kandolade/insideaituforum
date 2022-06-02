const express = require("express");
const router = express.Router();
const Posts = require("../models/posts");
const User = require("../models/user");
const Tags = require("../models/tags");

require("dotenv").config();

function trimContent(content) {
  const map1 = content.map((post) => {
    let { contentWithoutMarkup } = post;
    let newContent = contentWithoutMarkup.substring(0, 200);
    post.contentWithoutMarkup = newContent;
    return post;
  });
  return map1;
}

router.get("/tags", async (req, res, next) => {
  let tagsObj = await Tags.find().lean();
  let tagsArray = tagsObj.map((el) => {
    return el.tagName;
  });
  let uniqueArray = tagsArray.filter(function (item, pos) {
    return tagsArray.indexOf(item) === pos;
  });
  var result = await Posts.find().lean();
  result = trimContent(result);
  var recommended = [...result];
  recommended = recommended.sort((a, b) =>
    a.views.toString().localeCompare(b.views.toString())
  );
  res.render("tags", {
    tags: uniqueArray,
    posts: result,
    recommended: recommended,
    path: {
      tags: true,
    },
  });
});

router.get("/tags/:id", async (req, res, next) => {
  let tagsObj = await Tags.find().lean();
  let tagsArray = tagsObj.map((el) => {
    return el.tagName;
  });
  let uniqueArray = tagsArray.filter(function (item, pos) {
    return tagsArray.indexOf(item) === pos;
  });
  let id = req.params.id;
  let result = await Posts.find({ tags: id }).lean();
  result = trimContent(result);
  var recommended = [...result];
  recommended = recommended.sort((a, b) =>
    a.views.toString().localeCompare(b.views.toString())
  );

  res.render("tags", {
    posts: result,
    recommended: recommended,
    tags: uniqueArray,
    path: {
      tags: true,
    },
  });
});

module.exports = router;
