const mongoose = require("mongoose")
const Joi = require("joi")

const orderSchema = new mongoose.Schema({
    name: String,
    surname: String,
    phone: String,
    location: {
        street: String,
        specific: String
    },
    clothes: {
        buttonShirts: Number,
        pants: Number,
        shirts: Number,
        other: String
    }
})

exports.Ordermodel = mongoose.model("orders", orderSchema);

exports.validateOrder = (reqBody) => {
    let joiSchema = Joi.object({
      name: Joi.string().min(2).max(20).required(),
      surname: Joi.string().min(2).max(20).required(),
      phone: Joi.string().min(9).max(20).required(),
      location:{
        street: Joi.string().min(2).max(50).required(),
        specific: Joi.string().min(2).max(50).required(),
      },
      clothes: {
        buttonShirts: Joi.number().max(20).required(),
        pants: Joi.number().max(20).required(),
        shirts: Joi.number().max(30).required(),
        other: Joi.string().max(50).required()
    }
    })
    return joiSchema.validate(reqBody);
  }