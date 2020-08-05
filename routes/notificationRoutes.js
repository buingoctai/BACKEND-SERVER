const express = require("express");
const router = express.Router();
const notificationController = require("./../controllers/notificationController");

router.post("/subscription", notificationController.handlePushNotificationSubscription);
router.get("/subscription", notificationController.sendPushNotification);

module.exports = router;