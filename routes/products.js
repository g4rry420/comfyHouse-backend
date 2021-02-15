const express = require("express");
const router = express.Router();

const { 
    createManyDepartment,
    createManySubDepartments,
    createManyProducts,
    createManyProductDetails,
    getDepartment,
    getSubDepartment,
    getProduct,
    getProductDetails } = require("../controllers/products")


//create
router.post("/department/create", createManyDepartment)
router.post("/subdepartment/create", createManySubDepartments)
router.post("/products/create", createManyProducts)
router.post("/productDetails/create", createManyProductDetails)

//get items to frontend
router.get("/departments", getDepartment)
router.post("/subdepartments", getSubDepartment)
router.post("/products", getProduct)
router.post("/productdetails", getProductDetails)

module.exports = router;