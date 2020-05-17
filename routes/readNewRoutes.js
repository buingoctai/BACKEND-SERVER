const express = require("express");
const router = express.Router();
const readNewController = require("./../controllers/readNewController");

router.post("/getAllArticle", readNewController.getAllArticle);

module.exports = router;
