const router = require("express").Router();
const notice = require("../models/noticeboard");


router.post("/addnotice", async (req, res) => {
    const existingNotice = await notice.findOne({ subject: req.body.subject });
  
  
    if (existingNotice) {
      return res.send(`this notice ${req.body.subject} already added`);
    } else {
      // GET AMOUNT
    
  
          const noticeitem= new notice ({
        subject:req.body.subject,
        notice: req.body.notice,
      });
//    console.log(notice)
         //SAVE VIDEO RECORD
    noticeitem.save();
      res.json({ status: "success", message: "Request Successful" });
    }
  });

  module.exports=router