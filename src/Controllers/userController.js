const User = require("../Models/userModel");
const createError = require('http-errors');

const getUserData = async (req, res, next) => {
    try {
        const search = req.query.search || '';
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegxp = new RegExp('.*' + search + '.*','i');
        const filter = {
            isAdmin : {$ne: true},
            $or :[
                {username:{$regex: searchRegxp}},
                {email:{$regex: searchRegxp}}
            ]
        }
        const options = {password: 0};
        const users = await User.find(filter,options).limit(limit).skip((page-1)*limit);

        const count = await User.find(filter).countDocuments();
        if(!users) throw createError(404,'User Not find');
        // Send the users as response
        res.status(200).send({
            users: users,
            pagination:{
                totalPages: Math.ceil(count/limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page-1 :null,
                nextPage: page+1<= Math.ceil(count/limit)?page+1:null,
                
            }
        });
    } catch(err) {
        // Forward error to error handling middleware
        next(err);
    }
}

module.exports = { getUserData };
