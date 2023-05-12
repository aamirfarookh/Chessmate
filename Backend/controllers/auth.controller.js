
const authHandler = async(req,res)=>{
     try {
        res.status(200).send({msg:"Logged in",status:200})
     } catch (error) {
        res.status(500).send({msg:error.message,status:500})
     }
}


module.exports = {authHandler}