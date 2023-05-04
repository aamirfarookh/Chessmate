// Improting all the required dependencies
const express = require("express");
const http = require("http");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { dbConnection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { oauthRouter } = require("./routes/oauth.route");

// Server configuration
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4500;
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Basic endpoint
app.get("/", (req, res) => {
  res.status(200).send("Home page");
});

app.use("/user", userRouter);
app.use("/auth", oauthRouter);

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
