import { Router } from "express";

import signup from "../controllers/authController/signup.js";
import signin from "../controllers/authController/signin.js";
import logout from "../controllers/authController/logout.js";

import authMiddleware from "../middleware/authMiddleware.js";

import createTask from "../controllers/curdController/createTask.js";
import getTasks from "../controllers/curdController/getTasks.js";
import updateTask from "../controllers/curdController/updateTask.js";
import deleteTask from "../controllers/curdController/deleteTask.js";
import updateTaskStatus from "../controllers/curdController/updateTaskStatus.js";

const router = Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post(
  "/logout",
  authMiddleware,
  logout
);

router.post("/create", authMiddleware, createTask);

router.get("/get", authMiddleware, getTasks);

router.put("/update/:id", authMiddleware, updateTask);

router.delete("/delete/:id", authMiddleware, deleteTask);

router.patch(
  "/status/:id",
  authMiddleware,
  updateTaskStatus
);

export default router;