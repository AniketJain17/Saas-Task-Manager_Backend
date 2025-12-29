const Task = require("../models/Task");

const logActivity = require("../utils/activityLogger");
const isValidObjectId = require("../utils/validateObjectId");

// 1️⃣ Create Task 
const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, priority, dueDate } = req.body;

    if (!title || !assignedTo) {
      return res.status(400).json({
        message: "Title and assignedTo are required"
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });


    await logActivity({
  action: "TASK_CREATED",
  task: task._id,
  performedBy: req.user.id,
  details: {
    assignedTo: task.assignedTo
  }
});


  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 2️⃣ Get My Tasks (Assignment-Based)
// const getMyTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({
//       assignedTo: req.user.id
//     }).sort({ createdAt: -1 });

//     res.json({ tasks });
//   } catch (error) {
//     console.error("Get tasks error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


const getMyTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tasks = await Task.find({ assignedTo: req.user.id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments({ assignedTo: req.user.id });

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalTasks: total,
      tasks
    });
  } catch (error) {
    next(error);
  }
};



// 3️⃣ Update Task (CRITICAL LOGIC)
const updateTask = async (req, res) => {
  try {

        if (!isValidObjectId(req.params.id)) {
  return res.status(400).json({ message: "Invalid task ID" });
}
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only ADMIN/MANAGER or assigned user can update
    if (
      req.user.role === "MEMBER" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You can only update your assigned tasks"
      });
    }

    const oldTask = {
  status: task.status,
  assignedTo: task.assignedTo
};


    Object.assign(task, req.body);
    await task.save();

    res.json({
      message: "Task updated",
      task
    });
    
await logActivity({
  action: "TASK_UPDATED",
  task: task._id,
  performedBy: req.user.id,
  details: {
    old: oldTask,
    new: {
      status: task.status,
      assignedTo: task.assignedTo
    }
  }
});



  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// 4️⃣ Delete Task
const deleteTask = async (req, res) => {
  try {


        if (!isValidObjectId(req.params.id)) {
  return res.status(400).json({ message: "Invalid task ID" });
}

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }



    await logActivity({
  action: "TASK_DELETED",
  task: task._id,
  performedBy: req.user.id
});


    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask
};
