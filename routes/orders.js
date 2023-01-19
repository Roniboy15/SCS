const express = require("express");
const { Ordermodel, validateOrder } = require("../models/orderModel");
const router = express.Router();

router.get("/", async (req,res) => {

    try {
        let data = await Ordermodel.find({});
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post("/", async (req,res) => {
    let validBody = validateOrder(req.body);

    if(validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        let order = new Ordermodel(req.body)
        await order.save();
        res.status(201);
    }
    catch (err) {
        if(err.code == 11000){
          return res.status(400).json({msg:"order already in system", code:11000})
        }
        console.log(err);
        res.status(500).json(err);
      }
})



module.exports = router;