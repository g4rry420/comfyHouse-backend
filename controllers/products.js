const Department = require("../models/department");
const { SubDepartment } = require("../models/subDepartment");
const Products = require("../models/mainProduct");
const ProductDetails = require("../models/productDetails");

exports.createManyDepartment = (req, res) => {
    Department.insertMany(req.body, (err, department) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save department in DB",
                err
            });
        }

        return res.json({ success: "Department saved successfully", department });
    })
}

exports.createManySubDepartments = (req, res) => {
    SubDepartment.insertMany(req.body, (err, subDepartment) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save SubDepartment in DB",
                err
            });
        }

        return res.json({ success: "SubDepartment saved successfully", subDepartment });
    })
}

exports.createManyProducts = (req, res) => {
    Products.insertMany(req.body, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save Products in DB",
                err
            });
        }

        return res.json({ success: "Products saved successfully", products });
    })
}

exports.createManyProductDetails = (req, res) => {
    ProductDetails.insertMany(req.body, (err, productDetails) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save ProductDetails in DB",
                err
            });
        }

        return res.json({ success: "ProductDetails saved successfully", productDetails });
    })
}

exports.getDepartment = (req, res) => {
    Department.find({})
    .sort([["_id", "asc"]])
    .exec((err, department) => {
        if(err || !department.length){
            return res.status(400).json({
                error: "Not able to get All Department",
                err
            });
        } 

        return res.json({ success: "Department retrieved successfully", department })
    })
}

exports.getSubDepartment = (req, res) => {
    SubDepartment
    .find({ "department": req.body.departmentId })
    .populate({
        path: "department",
        select: "title",
        options: { limit: 1 }
    })
    .sort([["_id", "asc"]])
    .exec((err, subdepartments) => {
        if(err || !subdepartments.length){
            return res.status(400).json({
                error: "Not able to get SubDepartment",
                err
            });
        }

        return res.json({ success: "SubDepartment retrieved successfully", subdepartments })
    })
}

exports.getProduct = (req, res) => {
    Products.find({ "subDepartmentItem": req.body.subDepartmentItemId })
    .sort([["_id", "asc"]])
    .exec((err, products) => {
        if(err || !products.length){
            return res.status(400).json({
                error: "Not able to get products",
                err,
                products
            });
        }

        return res.json({ success: "Products retrieved successfully", products })
    })
}

exports.getProductDetails = (req, res) => {

    const sortBy = "_id";

    ProductDetails.find({ "product": req.body._id })
    .populate("product", "title price")
    .sort([[sortBy, "asc"]])
    .exec((err, productDetails) => {
        if(err || !productDetails.length){
            return res.status(400).json({
                error: "Not able to get product details",
                err
            });
        }

        return res.json({ success: "Product Details retrieved successfully", productDetails })
    })
}