import jwt from 'jsonwebtoken';
import userModal from '../models/User.js';
import dotenv from "dotenv";
dotenv.config();

export const checkUserAuth =async (req,res,next) =>{
    let token;
    const { authorization } = req.headers;
   
    if(authorization && authorization.startsWith('Bearer')){
        try{
            token = authorization.split(' ')[1];
            //verify token
            const {userId} = jwt.verify(token,process.env.JWT_SECRET_KEY)

            req.user = await userModal.findById(userId).select('-password');
            next();
        }catch(err){
            res.status(400).json({ status: 400, message: "Unauthorized User" });
        }
    }else{
        res.status(400).json({ status: 400, message: "Token not verified" });
    }
}