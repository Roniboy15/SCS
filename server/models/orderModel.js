const { string } = require("joi");
const Joi = require("joi")
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    customerPhone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15
    },
    customerAddress: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 200
    },
    orderItems: {
        type: String,
        required: true
    },
    orderTotal: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'pending'
    },
    
    created_at: {
        type: Date,
        default: (new Date(Date.now() + 2 * 60 * 60 * 1000))
    }
});

exports.OrderModel = mongoose.model("orders", OrderSchema);

exports.validateOrder = (reqBody) => {
    
    let schema = Joi.object({
        customerName: Joi.string().min(3).max(50).required(),
        customerPhone: Joi.string().min(10).max(15).required(),
        customerAddress: Joi.string().min(10).max(200).required(),
        orderItems: Joi.string().required(),
        orderTotal: Joi.number().required(),
        orderStatus: Joi.string().valid('pending', 'in progress', 'completed')
    });

    return schema.validate(reqBody);
}

