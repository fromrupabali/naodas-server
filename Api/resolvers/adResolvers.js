const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Ad = require('../models/ad');
const User = require('../models/user');


module.exports = {
    Query:{
      
    },
    Mutation:{
      createAd: async(args, req) =>{
          try{
             const decodedToken = jwt.verify(req.adInput.token, process.env.SECRET_KEY);
             const user = await User.findById(decodedToken.userId);
             console.log("User", user);
             const ad = new Ad({
                 _id: new mongoose.Types.ObjectId(),
                 title: req.adInput.title,
                 priceType: req.adInput.priceType,
                 price: req.adInput.price,
                 categoryId: req.adInput.categoryId,
                 categoryName: req.adInput.categoryName,
                 subcategoryId: req.adInput.subcategoryId,
                 subcategoryName: req.adInput.subcategoryName,
                 quantity: req.adInput.quantity,
                 description: req.adInput.description,
                 images: req.adInput.images,
                 plan: req.adInput.plan,
                 planDetails: req.adInput.planDetails,
                 country: req.adInput.country,
                 city:req.adInput.city,
                 area: req.adInput.area,
                 shippingType: req.adInput.shippingType,
                 collectionPrice: req.adInput.collectionPrice,
                 contactType: req.adInput.contactType,
                 contactPhone: req.adInput.contactPhone,
                 user: user._id,
             });
             console.log(ad);

             return{
                 ...ad._doc
             }
          }catch(error){
              throw error;
          }
      }
    }
}