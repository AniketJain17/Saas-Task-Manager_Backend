const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
      // e.g. TASK_CREATED, TASK_UPDATED, TASK_DELETED
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    details: {
      type: Object
      // flexible payload (oldStatus, newStatus, reassignedTo, etc.)
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);
