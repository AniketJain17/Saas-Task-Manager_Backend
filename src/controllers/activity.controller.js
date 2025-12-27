const ActivityLog = require("../models/ActivityLog");

const getLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("performedBy", "name email role")
      .populate("task", "title status")
      .sort({ createdAt: -1 });

    res.json({ logs });
  } catch (error) {
    console.error("Get logs error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getLogs };
