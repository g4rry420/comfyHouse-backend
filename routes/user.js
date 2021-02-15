const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth")
const { getUserById, userCartList, addUserCartItems, removeCartItem, increaseCartItemQty, decreaseCartIemQty } = require("../controllers/user")

router.param("userId", getUserById);


//Add items to user cart
router.post("/cart/add/:userId", isSignedIn, isAuthenticated, addUserCartItems)

//get cart items 
router.post("/cart/user/:userId", isSignedIn, isAuthenticated, userCartList)

//removeItem from the cart
router.put("/cart/remove/:userId", isSignedIn, isAuthenticated, removeCartItem)

//update item in the cart
router.put("/cart/increase/qty/:userId", isSignedIn, isAuthenticated, increaseCartItemQty )
router.put("/cart/decrease/qty/:userId", isSignedIn, isAuthenticated, decreaseCartIemQty )

module.exports = router;