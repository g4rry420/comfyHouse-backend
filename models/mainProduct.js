const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const mainProductSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 62,
        unique: true
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 2000
    },
    color: {
        type: Number,
        trim: true,
        required: false,
        maxlength: 2000
    },
    imageUrl: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000,
        unique: true
    },
    subDepartmentItem: {
        type: ObjectId,
        ref: "SubDepartment",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Products", mainProductSchema)