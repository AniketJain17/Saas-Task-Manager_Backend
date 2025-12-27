const ActivityLog = require("../models/ActivityLog");

const logActivity = async ({ action, task, performedBy, details }) => {
  try {
    await ActivityLog.create({
      action,
      task,
      performedBy,
      details
    });
  } catch (error) {
    console.error("Activity log failed:", error.message);
  }
};

module.exports = logActivity;
