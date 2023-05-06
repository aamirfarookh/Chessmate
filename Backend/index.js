
// Improting all the required dependencies
const express = require("express");
const http = require("http");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { dbConnection } = require("./config/db");

const { lboardRouter } = require("./routes/leaderboard.route");

const { userRouter } = require("./routes/user.route");


// Server configuration
const app = express();
const server = http.createServer(app);
let session = require("express-session");
const PORT = process.env.PORT || 4500;
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: "chess secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Basic endpoint
app.get("/", (req, res) => {
  res.status(200).send("Home page");
});


app.use("/leaderboard",lboardRouter)

app.use("/user", userRouter);


// Listening to connections made to server
server.listen(PORT, async () => {
  try {
    console.log(`Server is running on port ${PORT}`);
    await dbConnection;
    console.log("Connection established to database");
  } catch (error) {
    console.log(error);
  }
});
