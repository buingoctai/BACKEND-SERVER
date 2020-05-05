const express = require("express");
const cors = require("cors");
const router = express.Router();
const blogController = require("./../controllers/blogController");

router.post("/mainPosts", blogController.getMainPosts);
router.post("/featuredPosts", blogController.getFeaturedPosts);
router.post("/allPost", blogController.getAllPost);
router.post("/getDetailPost", blogController.getDetailPost);

module.exports = router;
