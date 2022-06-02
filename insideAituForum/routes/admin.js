const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/profile", isAuth, adminController.getProfile);
router.get("/posts", isAuth, adminController.getPosts);
router.get("/add", isAuth, adminController.getAddPost);
router.get("/edit/:id", isAuth, adminController.getEditPost);
router.post("/edit", isAuth, adminController.postEditPost);
router.post("/add", isAuth, adminController.postAddPost);
router.get("/add/answer/:id", isAuth, adminController.getAddAnswer);
router.post("/add/answer", isAuth, adminController.postAddAnswer);
router.post("/profile", isAuth, adminController.postProfile);
router.post("/profile/addPhoto", isAuth, adminController.postProfileAddPhoto);



module.exports = router;
