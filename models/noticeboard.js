
const mongoose = require('mongoose')
const noticeBoardSchema = new mongoose.Schema({
subject:{
    type: String,
    required: true,
    min:1
}
,
notice:{
    type: String,
    required: true,
    min:2
},
 
dateRegistered:{
    type: String,
    default: Date.now
}
})
module.exports=mongoose.model('Notice',noticeBoardSchema)
  