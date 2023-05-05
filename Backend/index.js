// Improting all the required dependencies
const express = require("express");
const http = require("http");
require("dotenv").config();
const { dbConnection } = require("./config/db");
const { lboardRouter } = require("./routes/leaderboard.route");


// Server configuration 
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4500;
app.use(express.json())


// Basic endpoint
app.get("/",(req,res)=>{
    res.status(200).send("Home page")
})

app.use("/leaderboard",lboardRouter)

// Listening to connections made to server
server.listen(PORT,async()=>{
    try {
        console.log(`Server is running on port ${PORT}`);
        await dbConnection
        console.log("Connection established to database")
    } catch (error) {
        console.log(error)
    }
})