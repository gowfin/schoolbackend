const express=require("express");
const  Mongoose  = require("mongoose");
const Path=require("path");
const cors = require("cors");
const User = require('./models/User')
const app=express();
require('dotenv').config();
var localmongodb='mongodb://127.0.0.1:27017/schooldb';

const SERVER_PORT_NO=process.env.PORT||5500;

    
 ///profile pix
app.get('/profileimage/:email',async (req, res) => {
    
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
  // app.get('/profileimage/:email',function(req, res){
  //   res.send(req.params.email)
  // })
//NON-ROUTE MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//ROUTES MIDDLEWARE

app.use("/auth", require("./routes/authentication"));
app.use("/",require("./routes/main"))
app.use("/", require("./routes/video_route"));
app.use("/", require("./routes/notice_route"));


app.listen(SERVER_PORT_NO,()=>console.log(`Server is running on port: ${SERVER_PORT_NO}`))
 const conn= async()=>{
     await 
Mongoose.connect(localmongodb || process.env.DATABASE_URI,{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>console.log("Database is connected"))
.catch((err)=>console.log(err));
 }


//  app.post('/api/upload', async (req, res) => {
//     try {
//         const fileStr = req.body.data;
//         const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//             upload_preset: 'dev_setups',
//         });
//         console.log(uploadResponse);
//         // console.log("uploadResponse");
//         res.json({ msg: 'yaya' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ err: 'Something went wrong' });
//     }
//   });
//   app.get('/api/images', async (req, res) => {
//     const { resources } = await cloudinary.search
//         .expression('folder:dev_setups')
//         .sort_by('public_id', 'desc')
//         .max_results(30)
//         .execute();
  
//     const publicIds = resources.map((file) => file.public_id);
//     res.send(publicIds);
//   });
//set static folder
// // app.use(express.static(Path.join(__dirname,'public')));


  conn();
