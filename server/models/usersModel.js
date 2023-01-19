const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const { config } = require("../config/secret")
 
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date_created: {
    type: Date, default: Date.now()
  },
  role:{
    type:String, default:"user"
  }
})

exports.UserModel = mongoose.model("users", userSchema);

exports.createToken = (_id,role) => {
  let token = jwt.sign({_id,role},config.tokenSecret,{expiresIn:"600mins"});
  return token;
}


exports.validateUser = (reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    email: Joi.string().min(2).max(150).email().required(),
    password: Joi.string().min(3).max(150).required()
  })
  return joiSchema.validate(reqBody);
}

exports.validateLogin = (reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(150).email().required(),
    password: Joi.string().min(3).max(150).required()
  })
  return joiSchema.validate(reqBody);
}