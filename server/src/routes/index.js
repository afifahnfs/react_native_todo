const express = require("express");

const router = express.Router();

// import controller
const {
  register,
  login,
  updateUser,
  getUser,
  deleteUser,
} = require("../controllers/user");

const {
  getCollection,
  addCollection,
  updateCollection,
  deleteCollection,
} = require("../controllers/collection");

const {
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");

// import middleware auth
const { auth } = require("../middlewares/auth");

// import middleware uploadFile
const { uploadFile } = require("../middlewares/uploadFile");

// add route
router.post("/register", register);
router.post("/login", login);
router.patch("/user", auth, uploadFile("image"), updateUser);
router.get("/user", auth, getUser);
router.delete("/user", auth, deleteUser);

router.get("/collection/:id", getCollection);
router.post("/collection/:id", addCollection);
router.patch("/collection/:id", auth, updateCollection);
router.delete("/collection/:id", auth, deleteCollection);

router.get("/task/:id", getTask);
router.post("/task/:id", addTask);
router.patch("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

module.exports = router;
