const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let passport = require("../config/google_oauth");

//------------------- Google OAuth Start -----------------------------------------

let authgoogle = () => {
  passport.authenticate("google", { scope: ["profile", "email"] });
};

// userRouer.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

let authgooglecall = () => {
  passport.authenticate("google", {
    failureRedirect: "/user/login",
    session: false,
  }),
    async function (req, res) {
      const fetch_user = await UserModel.findOne({ email: req.user.email });
      if (fetch_user) {
        // Generating access token
        const accessToken = jwt.sign(
          { userId: fetch_user._id },
          process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: 60 * 60 * 24 }
        );

        // Generating refresh token
        const refreshToken = jwt.sign(
          { userId: fetch_user._id },
          process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: 60 * 60 * 24 * 4 }
        );

        // Storing tokens in cookies.
        res.cookie("JAA_access_token", accessToken, { maxAge: 60 * 60 * 24 });
        res.cookie("JAA_refresh_token", refreshToken, {
          maxAge: 60 * 60 * 24 * 4,
        });

        // res.redirect("homepage or login page route here");

        // res.redirect("../../.login");
        res.redirect("/user/login");
      } else {
        req.user.password = bcrypt.hashSync(req.user.password, 5);
        const user = new UserModel(req.user);
        await user.save();

        // Generating access token
        const accessToken = jwt.sign(
          { userId: fetch_user._id },
          process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: 60 * 60 * 24 }
        );

        // Generating refresh token
        const refreshToken = jwt.sign(
          { userId: fetch_user._id },
          process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: 60 * 60 * 24 * 4 }
        );

        // Storing tokens in cookies.
        res.cookie("JAA_access_token", accessToken, { maxAge: 60 * 60 * 24 });
        res.cookie("JAA_refresh_token", refreshToken, {
          maxAge: 60 * 60 * 24 * 4,
        });

        // res.redirect("homepage or login page route here");
        res.redirect("/user/login");
      }
    };
};

// userRouer.get(
//   "/auth/google/callback",
// passport.authenticate("google", {
//   failureRedirect: "/login",
//   session: false,
// }),
// async function (req, res) {
//   const fetch_user = await UserModel.findOne({ email: req.user.email });
//   if (fetch_user) {
//     // Generating access token
//     const accessToken = jwt.sign(
//       { userId: fetch_user._id },
//       process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
//       { expiresIn: 60 * 60 * 24 }
//     );

//     // Generating refresh token
//     const refreshToken = jwt.sign(
//       { userId: fetch_user._id },
//       process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
//       { expiresIn: 60 * 60 * 24 * 4 }
//     );

//     // Storing tokens in cookies.
//     res.cookie("JAA_access_token", accessToken, { maxAge: 60 * 60 * 24 });
//     res.cookie("JAA_refresh_token", refreshToken, {
//       maxAge: 60 * 60 * 24 * 4,
//     });

//     // res.redirect("homepage or login page route here");

//     res.redirect("/user/login");
//   } else {
//     req.user.password = bcrypt.hashSync(req.user.password, 5);
//     const user = new UserModel(req.user);
//     await user.save();

//     // Generating access token
//     const accessToken = jwt.sign(
//       { userId: fetch_user._id },
//       process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
//       { expiresIn: 60 * 60 * 24 }
//     );

//     // Generating refresh token
//     const refreshToken = jwt.sign(
//       { userId: fetch_user._id },
//       process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
//       { expiresIn: 60 * 60 * 24 * 4 }
//     );

//     // Storing tokens in cookies.
//     res.cookie("JAA_access_token", accessToken, { maxAge: 60 * 60 * 24 });
//     res.cookie("JAA_refresh_token", refreshToken, {
//       maxAge: 60 * 60 * 24 * 4,
//     });

//     // res.redirect("homepage or login page route here");
//     res.redirect("/user/login");
//   }
// }
// );

//------------------- OAuth Google  end -----------------------------------------

module.exports = {
  authgoogle,
  authgooglecall,
};
