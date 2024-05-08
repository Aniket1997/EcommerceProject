const User = require("../Models/userModel");
const data = require('../../data')

const seedUser = async (req,res,next)=>{
    try{
        // deleting existing user
        await User.deleteMany({});
         console.log(data)
        //insert new users
        const users = await User.insertMany(data.data.Users);
       
        return res.status(201).json(users)

    }
    catch(err)
    {
        next(err);
    }
}

module.exports ={seedUser};