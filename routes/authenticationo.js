const router = require("express").Router();
const User = require("../models/User");
const Joi = require("@hapi/joi");
const { schema } = require("../models/User");
const bcrypt= require("bcrypt");
const { registerValidationSchema, loginValidationSchema } = require("../validations/validations");
const jsonwebtoken= require('jsonwebtoken');


router.post("/register", async (req, res) => {
  //VALIDATE USERS' REQUEST
  const { error } = registerValidationSchema.validate(req.body);
  if (error) {
    res.send(error.details[0].message);
  } else {
    const existingUser= await User.findOne({email: req.body.email});
    if(existingUser){
res.send(`${req.body.email} already exist.`);
    }
    else{
      //HASH PASSWORD
      const salt = await bcrypt.genSalt(10)
      const hashpassword = await bcrypt.hash(req.body.password,salt)
    const user = new User({
      studentID: req.body.phoneNumber,
      fullname: req.body.fullname,
      email: req.body.email,
      state: req.body.state,
      dob: req.body.dob,
      password: hashpassword,
      imageurl: req.body.imageurl,
    });
  
    try {
      // Save User to Database
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
});
router.post("/login", async (req, res)=>{
  //validate user's request
  const {error} = loginValidationSchema.validate(req.body);
  if(error){
      res.status(400).send(error.details[0].message);
          } else {
              //check if user exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
          //check user password

          const validPassword = await bcrypt.compare(req.body.password, existingUser.password)
              if(validPassword){
                //ASSIGN A TOKEN TO USER
                const gentoken=jsonwebtoken.sign(
                  {
            id: existingUser._id,
            fullname: existingUser.fullname
                    
                  },
                  process.env.JSON_WEB_TOKE_KEY
                );
                return res.header("Authorization-Token",gentoken).json({status:'success', token:gentoken})
                
              }else{
                  return res.status(400).send("Email and/or Password is wrong")
              }
          }
  }
})
router.get("/user", async (req, res) => {
  const token = req.header("Authorization-Token");
  if (!token) return res.status(401).json({ message: "Unauthorized resource" });

  try {
    const verified = jsonwebtoken.verify(token, process.env.JSON_WEB_TOKE_KEY);
    res.json({ user: verified });
  } catch (err) {
    res.status(400).send("Invalid Authorization details");
  }
})
module.exports = router;