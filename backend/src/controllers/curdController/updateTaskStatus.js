import Task from "../../models/Task.js";

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (
      status !== "pending" &&
      status !== "completed"
    ) {
      return res.status(400).json({
        message:
          "Status must be pending or completed",
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default updateTaskStatus;