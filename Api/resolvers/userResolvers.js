const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Order = require('../models/order');

module.exports = {
    Query:{
        signIn: async(args, req) =>{
            try {
                console.log("I am in.")
                const user = await User.findOne({email: req.email});
                if(!user){
                    return{
                        success: false,
                        error_message:'Invalid account credentials.'
                    }
                }
                const match = await bcrypt.compare(req.password, user.password);

                if(!match){
                  return{
                      success: false, 
                      error_message:"Password doesn't match."
                  }
              }
                const token = jwt.sign(
                    {userId: user.id, phone: user.phone},
                    process.env.SECRET_KEY,
                    {
                        expiresIn: '365d'
                 });
                 return{
                     success:true,
                     token
                 }

            } catch (error) {
                throw error
            }
        }
    },


   Mutation:{
    signUp: async(args, req) =>{
        try {
            const user = await User.findOne({email: req.email});
            if(user){
                return{
                    success: false,
                    error_message:"Email already used, try another one."
                }
            }
            const hashPass = await bcrypt.hash(req.password, 10);

            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                user_name: req.userName,
                email: req.email,
                password: hashPass
            });

            console.log(newUser);
            await newUser.save();

            const token = jwt.sign(
                {userId: newUser.id, phone: newUser.phone},
                process.env.SECRET_KEY,
                {
                    expiresIn: '365d'
             });
            return{
                success: true,
                userId:newUser.id,
                token
            }
            
        } catch (error) {
            throw error;
        }
    },
    forgotPassword: async(args, req) =>{
        try {
            const user = await User.findOne({phone: req.phone});
            if(!user){
                return{
                    success: false,
                    error_message:"No result found. Please try again with other information.",
                    resetCode: null
                }
            }
            const resetCode = Math.floor(Math.random()*899999+100000);
            await user.updateOne({
                resetCode
            });
            return{
                success: true,
                phone: req.phone,
                resetCode: null
            }
        } catch (error) {
            throw error;
        }
    },
    confirmResetCode: async(args, req) =>{
        try {
            const user = await User.findOne({phone: req.phone});
                if(user.resetCode !== req.resetCode){
                    return{
                        success: false,
                        resetCode: null,
                        error_message:"Authorization code wrong."
                    }
                }
                await user.updateOne({
                    passwordReset: true
                });
                return{
                     success: true,
                     resetCode: null
                }
        } catch (error) {
            throw error;
        }
    },
    resetPassword: async(args, req) =>{
        try {
            const user = await User.findOne({phone: req.phone});
            if(!user){
                throw new Error('User not found!');
            }
            if(!user.passwordReset){
                throw new Error('Something went wrong!');
            }
            const hashPass = await bcrypt.hash(req.newPassword, 10);
            await user.updateOne({
                password: hashPass,
                passwordReset: false,
                resetCode: null
            });
            return{
                success: true
            }
        } catch (error) {
            throw error;
        }
    },
    changePassword: (args, req) =>{
        try {
            
        } catch (error) {
            throw error;
        }
    },
    }
}