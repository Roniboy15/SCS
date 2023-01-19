const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { validateUser, UserModel, validateLogin, createToken } = require("../models/usersModel");
const { config } = require("../config/secret")
const router = express.Router();


//route to sign up a new user:

router.post("/", async (req, res) => {

  let validBody = validateUser(req.body);

  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  try {
    let user = new UserModel(req.body)
    user.password = await bcrypt.hash(user.password, 10)
    await user.save();
    user.password = "*****"
    res.status(201).json(user)
  }
  catch (err) {
    if (err.code == 11000) {
      return res.status(401).json({ msg:"Email signed up already, do you want to log in?", code: 11000 })
    }
    console.log(err);
    res.status(500).json(err);
  }
})

//Route to log in an existing user and for the user to retrieve a token:

router.post("/login", async (req, res) => {

  let validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ msg: "User or Password doesn't match. code 1" })
    }
    let validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(401).json({ msg: "User or Password doesn't match. code 2" })
    }
    let token = createToken(user._id, user.role);
    res.json({ token: token })
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

//Route to receive the logged-in user's information:

router.get("/myUser", async(req,res) => {

  let token = req.header("x-api-key");

  if(!token){
    return res.status(401).json({msg:"You must send to here token"})
  }
  try{
    let decodeToken = jwt.verify(token, config.tokenSecret);
    let data = await UserModel.findOne({_id:decodeToken._id}, {password:0})
  
    res.json(data);
  }
  catch(err){
    res.json({msg:"Token invalid or expired"})
  }
})


module.exports = router;
