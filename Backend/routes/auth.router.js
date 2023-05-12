const express = require("express");
const { authHandler } = require("../controllers/auth.controller");
const { auth } = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.get("/",auth,authHandler);


module.exports = {authRouter}