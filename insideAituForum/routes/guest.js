const path = require("path");

const express = require("express");

const router = express.Router();

const GuestFeedback = require("../models/guestFeedback");

router.post("/feedback", (req, res, next) => {
  const feedbacka = req.body.feedbacka;
  console.log("Feedback" + feedbacka);

  const guest = new GuestFeedback({
    feedback: feedbacka,
  });

  return guest.save().then((result) => {
    res.redirect("/admin/feedback");
  });
});

router.get("/error", (req, res, next) => {
  const error = new Error("Testing Error Controller");
  error.httpStatusCode = 500;
  return next(error);
});

module.exports = router;
