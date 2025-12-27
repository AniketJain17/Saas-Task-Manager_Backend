const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const activityController = require("../controllers/activity.controller");

router.get(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  activityController.getLogs
);

module.exports = router;
