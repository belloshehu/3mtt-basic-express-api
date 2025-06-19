const { Router } = require("express");
const UserController = require("../controllers/user.controller");

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/", userController.createUser);

module.exports = userRouter;
