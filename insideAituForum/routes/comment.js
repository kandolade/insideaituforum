const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const fs = require("fs");
const Comments = require("../models/comments");
const User = require("../models/user");
const isAuth = require("../middleware/is-auth");

router.post("/add/comment", isAuth, (req, res, next) => {
  const newComment = req.body.comment;
  const id = req.body.id;
  let userId = req.session.user._id;
  User.findById({ _id: userId })
    .then((result) => {
      if (result.fname) {
        let fname = result.fname;
      } else fname = "Anonymous";
      const comment = new Comments({
        data: newComment,
        userId: userId,
        userName: fname,
      });
      comment.save().then((result) => {
        res.redirect(`/fullpage/watch/${id}`);
      });
    })
    .catch((err) => {
      const error = new Error(" DB Error ");
      error.httpStatusCode = 500;
      return next(error);
    });
});

module.exports = router;
