const router = require("express").Router();
const video = require("../models/video");


router.post("/uploadvideo", async (req, res) => {
    const existingVideo = await video.findOne({ title: req.body.title });
  
  
    if (existingVideo) {
      return res.send(`this video ${req.body.title} already uploaded`);
    } else {
      // GET AMOUNT
    
  
          const videoitem= new video ({
        title:req.body.title,
        path: req.body.path,
      });
   console.log(video)
         //SAVE VIDEO RECORD
     const  savedVideo=videoitem.save();
      res.json({ status: "success", message: "Request Successful" });
    }
  });

  module.exports=router