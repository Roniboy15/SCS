const express = require("express");
const { auth } = require("../middlewares/auth");
const { Order, validateOrder, OrderModel } = require("../models/orderModel");
const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
    const orders = await Order.find().sort('customerName');
    res.send(orders);
});

// Get a specific order by ID
router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('The order with the given ID was not found.');
    res.send(order);
});

// Create a new order
router.post('/', async (req, res) => {
    let validBody = validateOrder(req.body);
    if (validBody.error) return res.status(400).json(validBody.error.details);

    try {
        let order = new OrderModel(req.body)
        await order.save();
    }
    catch (err) {
        console.log(err);
        res.json(err.details)
    }

});


// Update an existing order by ID
router.put('/:id', async (req, res) => {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const order = await Order.findByIdAndUpdate(req.params.id,
        {
            customerName: req.body.customerName,
            customerPhone: req.body.customerPhone,
            customerAddress: req.body.customerAddress,
            orderItems: req.body.orderItems,
            orderTotal: req.body.orderTotal,
            orderStatus: req.body.orderStatus
        },
        { new: true });

    if (!order) return res.status(404).send('The order with the given ID was not found.');
    res.send(order);
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
    const order = await Order.findByIdAndRemove(req.params.id);
    if (!order) return res.status(404).send('The order with the given ID was not found.');
    res.send(order);
});

module.exports = router;