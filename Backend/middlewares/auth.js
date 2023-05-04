const jwt = require("jsonwebtoken");
require("dotenv").config();
const { client } = require("../controllers/user.controller");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

let auth = async (req, res, next) => {
  const { JAA_access_token, JAA_refresh_token } = req?.cookies;

  if (!JAA_access_token) {
    return res.status(400).send({ msg: "Please login!" });
  } else {
    const isTokenBlacklisted = await client.get(JAA_access_token);

    if (isTokenBlacklisted !== null) {
      return res.send({ msg: "please login again, already logged out" });
    } else {
      jwt.verify(
        JAA_access_token,
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        async (err, payload) => {
          if (!payload) {
            if (err.message == "jwt expired") {
              try {
                const token = await fetch(
                  "http://localhost:4500/user/refresh-token",
                  {
                    headers: {
                      "content-type": "application/json",
                      Authorization: JAA_refresh_token,
                    },
                  }
                );
                let resp = await token.json();
                if (resp.msg == "Token generated") {
                  req.body.userId = payload._id;
                  next();
                } else {
                  res.status(400).send({ msg: "Please login" });
                }
              } catch (error) {
                res.status(500).send({ msg: error.message });
              }
            } else if (payload) {
              req.body.userId = payload._id;
              next();
            } else {
              res.status(400).send({ msg: err.message });
            }
          } else {
            req.body.userId = payload._id;
            next();
          }
        }
      );
    }
  }
};

module.exports = { auth };
