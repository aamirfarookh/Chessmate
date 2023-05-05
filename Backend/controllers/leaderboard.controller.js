const {UserModel} = require("../models/user.model")

const leaderboardHandler = async(req,res)=>{
    try {
        const users = await UserModel.find().sort({nor_of_wins:1});
        res.status(200).send(users);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}


module.exports = {leaderboardHandler}