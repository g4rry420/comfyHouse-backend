const mongoose = require("mongoose");

const { Schema } = mongoose;

const departmentsSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    routeName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    images: {
        bigImageUrl: {
            type: String,
            required: true
        },
        smallImageUrl: {
            type: String,
            required: true
        },
        mainImageUrl: {
            type: String,
            required: false
        }
    }
}, { timestamps: true })

module.exports = mongoose.model("Department", departmentsSchema)