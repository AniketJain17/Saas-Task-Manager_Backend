const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const taskController = require("../controllers/task.controller");

// Create task (ADMIN, MANAGER)
router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN", "MANAGER"),
  taskController.createTask
);

// Get my tasks
router.get(
  "/my",
  authenticate,
  taskController.getMyTasks
);

// Update task
router.put(
  "/:id",
  authenticate,
  taskController.updateTask
);

// Delete task (ADMIN only)
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  taskController.deleteTask
);

module.exports = router;
