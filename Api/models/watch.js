const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: String,
        required: true
    },
    adId:{
        type: String,
        required: true
    },
    createdAt:{
        type: String
    }
});


module.exports = mongoose.model('Watch', watchSchema);