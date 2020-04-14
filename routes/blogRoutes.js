const express = require("express");
const router = express.Router();
const blogController = require("./../controllers/blogController");

router.post("/mainPosts", blogController.getMainPosts);
router.post("/featuredPosts", blogController.getFeaturedPosts);
module.exports = router;
