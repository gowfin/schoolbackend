const router = require("express").Router();
const verifyToken= require("./webtoken")
router.get("/dashboard",verifyToken,(req,res)=>{
res.json({
    user:{
        "fullname":req.user.fullname,
        "Balance": "5000.00",
    },
    loans:[],
});

});


router.post("/update-img", verifyToken, async (req, res) => {
    const existingUser = await User.findOne({ _id: req.user._id });
  
    const { error } = loanApplicationValidationSchema.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    } else {
      // GET AMOUNT
      const imgurl= req.body.secure_url;
  
      // CHECK IF USER HAS A PENDING/DEFAULTING LOAN
  
      // ADD LOAN TO USERS RECORD
      existingUser.loans.push({ amount: imgurl });
  
      //SAVE USER RECORD
      await existingUser.save();
      res.json({ status: "success", message: "Request Successful" });
    }
  });
  
module.exports=router