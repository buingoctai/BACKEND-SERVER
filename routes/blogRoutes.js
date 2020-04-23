const express = require("express");
const cors = require("cors");
const router = express.Router();
const blogController = require("./../controllers/blogController");

router.options("/", cors());
router.post("/mainPosts", cors(), blogController.getMainPosts);
router.post("/featuredPosts", cors(), blogController.getFeaturedPosts);
router.post("/allPost", cors(), blogController.getAllPost);

module.exports = router;
