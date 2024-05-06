const { userData } = require("../Models/userData");
const createError = require('http-errors');

const getUserData =(req, res, next) => {
    try{
        console.log(req.userId); // Should output 101 if the user is not logged in
        res.status(200).send({
            userData,
        });
    }
    catch(err)
    {
        next(err);
    }
    
}

module.exports = {getUserData};