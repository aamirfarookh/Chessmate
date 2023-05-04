const {
  registerNewUser,
  NewAccessToken,
  logoutUser,
  loginUser,
} = require("../controllers/user.controller");

const { auth } = require("../middlewares/auth");

//   const { auth } = require("../middlewares/auth");

const userRouter = require("express").Router();

userRouter.post("/register", registerNewUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", auth, logoutUser);
userRouter.get("/refresh-token", NewAccessToken);

module.exports = { userRouter };
