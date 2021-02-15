const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const smallImagesSchema = new Schema({
    id: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 2000 
    },
    smallImage: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000,
        unique: true
    }
},{ timestamps: true })

const largeImagesSchema = new Schema({
    id: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 2000 
    },
    largeImage: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000,
        unique: true
    }
},{ timestamps: true })

const productDetailsSchema = new Schema({
    smallImage: [smallImagesSchema],
    largeImage: [largeImagesSchema],
    id: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 2000 
    },
    largeImage1: {
        type: String,
        trim: true,
        required: true,
        maxlength: 3200,
    },
    description: {
        type: String,
        trim: true,
        required: false,
        maxlength: 2000
    },
    productDetails: {
        type: Array,
        trim: true,
        required: false
    },
    product: {
        type: ObjectId,
        ref: "Products",
        required: true
    }
},{ timestamps: true })

module.exports = mongoose.model("ProductDetails", productDetailsSchema)