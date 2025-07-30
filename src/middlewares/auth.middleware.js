const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

async  function authMiddleware(req,res,next){
    const token = req.cookies.token;

    if(!token){
        res.status(401).json({
            message:"Unauthorized acess,please login first"
        })
      
        try{
      const decoded= jwt.verify(token , process.env.JWT_SECRET) 
      const user = await userModel.findOne({
        _id:decoded._id
      })
      req.user = user;
      next();

        }catch(err){
            return res.status(401).json({
                message:"Inavlid token, plase login again"
            })

        }

    }



}


module.exports=authMiddleware;