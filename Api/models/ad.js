const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{
        type: String,
        required: true,
        text: true
    },
    priceType:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    categoryId:String,
    categoryName:{
        type:String,
        required: true
    },
    subcategoryId: String,
    subcategoryName:{
        type: String
    },
    quantity:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
   
    images:[String],
    planName:{
        type: String,
        reduired: true
    },
    days:{
        type: Number
    },
    planStartDate:{
        type:String
    },
    planEndDate: {
        type:String
    },
    paid:{
        type: Boolean,
        default: false
    },
    cardId:String,
    country:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    shippingType:{
        type:String,
        required: true
    },
    collectionPrice:{
        type:Number
    },
    contactType:{
        type: String,
        default:"COMMENT"
    },
    conatctPhone:{
        type: String
    },
    user:{
        type: String,
        required: true
    },
    sold:{
        type: Boolean,
        default: false
    },
    reviews:[String],
    watchingUsers:[String],
    createdAt:{
        type: String
    }
});

module.exports = mongoose.model('Ad', adSchema);