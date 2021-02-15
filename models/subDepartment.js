const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const subDepartmentItems = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 52,
        unique: true
    },
    routeName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 52,
        unique: true
    },
    imageUrl: {
        type: String,
        trim: true,
        required: true,
        maxlength: 1000,
        unique: true
    }
},{ timestamps: true })

// const SubDepartmentItems = mongoose.model("SubDepartmentItems", subDepartmentItems)

const subDepartmentsSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    department: {
        type: ObjectId,
        ref: "Department",
        required: true
    },
    mainImage: {
        type: String,
        required: false
    },
    items: [subDepartmentItems]
}, { timestamps: true })

const SubDepartment = mongoose.model("SubDepartment", subDepartmentsSchema)

module.exports = { SubDepartment }
