const router = require("express").Router();
const Forms = require("../models/FormModel");
const User = require("../models/User");
const { registerValidationSchema,formValidationSchema, imageUpdateValidationSchema, loginValidationSchema,emailValidationSchema} = require("../validations/validations");
const { transporter } = require("./email/mailer");
const bcrpyt = require("bcrypt");
 const jsonwebtoken = require("jsonwebtoken");
 const verifyToken = require("./webtoken");
 const video = require("../models/video");
 const ProfileImg = require("../models/Image");
 const Noticeboard = require("../models/noticeboard");

// const redis = require("redis");
// const JWTR = require("jwt-redis").default;
// const redisClient = redis.createClient();
// const jwtr = new JWTR(redisClient);

router.post("/form", async (req, res) => {
  //VALIDATE USERS' REQUEST
  const { error } = formValidationSchema.validate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  } else {
    const existingUser = await Forms.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("User email already registered");
    } else {
      // HASH PASSWORD
      // const salt = await bcrpyt.genSalt(10);
      // const hashedPassword = await bcrpyt.hash(req.body.password, salt);

      const forms= new Forms({
        phone: req.body. phone,
        fullname: req.body.fullname,
        othername: req.body.othername,
        surname: req.body.surname,
        english: req.body.english,
        lga: req.body.lga,
        email: req.body.email,
        state: req.body.state,
        dob: req.body.dob,
        address: req.body.address,
        religion: req.body. religion,
        appliedClass: req.body.appliedClass,
        prevSch: req.body.prevSch,
        sex: req.body. sex,
        prevResult:req.body.prevResult,
      });
      try {
        // Save User to Database
        const savedform = await forms.save();
        console.log(savedform)
        return res.send(savedform);
       
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  }
});
//POST FOR USERS' REGISTRATION
router.post("/register", async (req, res) => {
  //VALIDATE USERS' REQUEST
  const { error } = registerValidationSchema.validate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  } else {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("User email already registered");
    } else {
      // HASH PASSWORD
      const salt = await bcrpyt.genSalt(10);
      const hashedPassword = await bcrpyt.hash(req.body.password, salt);

      const user= new User({
        studentID: req.body.studentID,
        fullname: req.body.fullname,
        email: req.body.email,
        state: req.body.state,
        dob: req.body.dob,
        imgurl: req.body.imgurl,
        password: hashedPassword,
        
      });
      try {
        // Save User to Database
        const savedUser = await user.save();
        return res.send(savedUser);
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  }
});

router.post("/login", async (req, res) => {
  // VALIDATE USERS' REQUEST
  const { error } = loginValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    //CHECK IF THE USER EXIST
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      // CHECK USER PASSWORD
      const validPassword = await bcrpyt.compare(req.body.password, existingUser.password);
      if (validPassword) {
        // ASSIGN A TOKEN TO USER
        const token = jsonwebtoken.sign(
          {
            _id: existingUser._id,
            fullname: existingUser.fullname,
          },
          process.env.JSON_WEB_TOKE_KEY
        );
        return res.header("Authorization-Token", token).json({ status: "success", token: token });
      } else {
        return res.status(400).send("Email and/or Password is wrong");
      }
    } else {
      res.status(400).send("Email and/or Password is wrong");
    }
  }
});

router.get("/user", async (req, res) => {
  const token = req.header("Authorization-Token");
  if (!token) return res.status(401).json({ message: "Unauthorized resource" });

  try {
    const verified = jsonwebtoken.verify(token, process.env.JSON_WEB_TOKE_KEY);
    res.json({ user: verified });
  } catch (err) {
    res.status(400).send("Invalid Authorization details");
  }
});

//UPDATE PROFILE
// router.post("/updateprofile", async (req, res) => {
//   // const existingUser = await User.findOne({ _id: req.user._id });

//   imageUpdateValidationSchema
//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser) {
//       const imgurl = req.body.imgurl;
//         // ADD IMGURL TO USERS RECORD
//         console.log(imgurl)
     
//       try {
//         existingUser.image.push({ url: imgurl  });
       
//    //SAVE USER RECORD
//    await existingUser.save();
//    res.json({ status: "success", message: "Request Successful" });
       
//         return res.send(savedUser);
//       } catch (err) {
//         return res.status(500).send(err);
//       }
     
//     } else {
      
  
//       return res.status(400).send("User email not found");
      
//     }
  
// });
//////
router.post("/updateprofile", async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  const { error } = imageUpdateValidationSchema.validate(req.body);
  if (error) {
    return res.send(error.details[0].message);
    // return res.send("Something happened");
  } else {
    // GET AMOUNT
    const imgurl = req.body.url;
    console.log(imgurl)
        const user= {
      studentID:existingUser.studentID,
      fullname: existingUser.fullname,
      email:existingUser .email,
      state: existingUser .state,
      dob: existingUser .dob,
      imgurl: imgurl,
      password: existingUser.password
      
    };
 console.log(user)
    // ADD LOAN TO USERS RECORD
    existingUser.image.push({url:imgurl});

    //SAVE USER RECORD
    await existingUser.save();
    res.json({ status: "success", message: "Request Successful" });
  }
});

//RESET USER PASSWORD ROUTER
router.post("/resetpw", async (req, res) => {
  // VALIDATE USERS' EMAIL
  const { error } = emailValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    //CHECK IF THE USER'S EMAIL EXIST
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      // SEND TOKEN TO EMAIL
      var detail = {
        from: 'noreply<noreply@yahoo.com>',
        to:req.body.email,
        text:"Click on the link to reset password",
        subject:"Deaviel College",
        
    }
    
    transporter.sendMail(detail , function(error, info){
      if (error) {
        console.log(error);
      } else {
        // req.flash('success','email sent success')
        // res.redirect('/posts')
        console.log('Email sent: ' + info.response);

      }
      transporter.close();
    });
    /////////////
    } else {
      res.status(400).send(`${req.body.email} is not registered in the system`);
    }
  }
});
router.get("/videos", async (req, res) => {
  video.find().then(function(results){
    res.send(results);
}).catch(function(err){
    console.error(err);
})
})


router.get("/notice", async (req, res) => {
  Noticeboard.find().then(function(results){
    res.send(results);
}).catch(function(err){
    console.error(err);
})
})

///profile pix
router.get('/profileimage/:email', async (req, res) => {
  // console.log(req.params)
  try{
    const currentUser= await User.findOne({email:req.params.email})
        res.send(currentUser.image.reverse()[0].url)
        console.log(currentUser)
        console.log(req.params.email)
  }catch(error){
     res.send(error)
     console.log(error)
  }
})
module.exports = router;
