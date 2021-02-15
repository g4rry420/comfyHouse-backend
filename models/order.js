const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const productCartSchema = new Schema({
    product: {
        type: ObjectId,
        ref: "ProductDetails",
        required: true,
        unique: true
    },
    qty: Number
})

const orderSchema = new Schema({
    products: [productCartSchema],
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    }
},{ timestamps: true })


// orderSchema.post("updateOne", function(doc) {
//     console.log("DOC  this", this)
// })

module.exports = mongoose.model("Order", orderSchema)