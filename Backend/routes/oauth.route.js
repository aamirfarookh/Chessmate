// let express = require("express");
let { authgoogle, authgooglecall } = require("../controllers/oauth.controller");

const oauthRouter = require("express").Router();

oauthRouter.get("/google", authgoogle);
oauthRouter.get("/google/callback", authgooglecall);

module.exports = { oauthRouter };
