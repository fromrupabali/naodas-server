const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required: true
    },
    products:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('CategoryM', categorySchema);