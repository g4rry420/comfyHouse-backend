const Order = require("../models/order")
const User = require("../models/user")

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }

        req.currentUser = user;

        next();
    })
};

exports.addUserCartItems = (req, res) => {
    req.body.order.user = req.currentUser._id

    Order.findOne({ user: req.body.order.user }, (err, order) => {
        if(err){
            console.log(err)
        }

        if(!order){

            if(req.body.order.products.length){

                new Order(req.body.order).save((err, ord) => {
                    if(err){
                        return res.status(400).json({
                            error: "error in saving the new order",
                            err
                        })
                    }
    
                    return res.json({
                        success: "order created successfully",
                        ord
                    })
                })


            }else{
                let product = [];
                product.push(req.body.order.products)
                req.body.order.products = product;

                new Order(req.body.order).save((err, ord) => {
                    if(err){
                        return res.status(400).json({
                            error: "error in saving the new order when item came individually",
                            err
                        })
                    }
    
                    return res.json({
                        success: "order created successfully",
                        ord
                    })
                })

            }
        }else {
            // if(!state.map(item => item._id).includes(action.product._id))
            if(order.products.map(item => item.product).includes(req.body.order.products.product)){
                return res.status(400).json({
                    error: "Item Already existed in the cart order."
                })
            }else{

                if(req.body.order.products.length){
                    req.body.order.products.forEach(item => {
                        order.products.push( item )
                    })
                }else{
                    order.products.push( req.body.order.products )
                }

                order.save((err, items) => {
                    if(err){
                        return res.status(400).json({
                            error: "Error in saving the item",
                            err
                        })
                    }

                    return res.json({
                        success: "Item is added",
                        items
                    })
                })
            }
        }
    })
}

exports.userCartList = (req, res) => {
    Order.findOne({ user: req.currentUser._id })
        .populate({
            path: "products",
            populate: {
                path: "product",
                model: "ProductDetails",
                select: "product largeImage1",
                populate: {
                    path: "product",
                    model: "Products",
                    select: "title price -_id"
                }
            }
        })
        .exec((err, cartItems) => {
            if(err || !cartItems){
                return res.status(400).json({
                    error: "no order Items were found",
                    err
                })
            }

            return res.json({ success: "cart items found successfully", products: cartItems});
        })
}

exports.removeCartItem = (req, res) => {

    Order.findOneAndUpdate(
        { user: req.currentUser._id },
        { $pull: { products: { product: req.body.productId } } },
        { new: true }
    ).exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "Unable to find the user ",
                err
            })
        }

        return res.json({
            success: "Cart item is removed successfully",
            order
        })
    })
}

exports.increaseCartItemQty = (req, res) => {

    Order.updateOne(
        { user: req.currentUser._id, "products.product": req.body.productId },
        { $inc: { "products.$.qty": 1 } },
        { new: true }
    ).exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "Unable to find the user ",
                err
            })
        }

        return res.json({
            success: "Cart item qty is increased successfully",
            order
        })
    })

}

exports.decreaseCartIemQty = (req, res) => {
    Order.updateOne(
        { user: req.currentUser._id, "products.product": req.body.productId },
        { $inc: { "products.$.qty": -1 } },
        { new: true }
    ).exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "Unable to find the user ",
                err
            })
        }

        return res.json({
            success: "Cart item qty is decreased successfully",
            order
        })
    })
}