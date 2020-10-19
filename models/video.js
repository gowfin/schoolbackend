
const mongoose = require('mongoose')
const videoSchema = new mongoose.Schema({
title:{
    type: String,
    required: true,
    min:1
}
,
path:{
    type: String,
    required: true,
    min:2
},
 
dateRegistered:{
    type: String,
    default: Date.now
}
})
module.exports=mongoose.model('Video',videoSchema)
  
 


 

