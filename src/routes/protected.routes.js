const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.get(
  "/admin",
  authenticate,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
      user: req.user
    });
  }
);

router.get(
  "/member",
  authenticate,
  authorizeRoles("ADMIN", "MANAGER", "MEMBER"),
  (req, res) => {
    res.json({
      message: "Welcome Member",
      user: req.user
    });
  }
);

module.exports = router;
